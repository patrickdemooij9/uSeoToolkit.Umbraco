import {
  customElement,
  repeat,
  state,
  when,
} from "@umbraco-cms/backoffice/external/lit";
import { css, html } from "lit";
import SiteAuditDetailContext, {
  ST_SITEAUDIT_DETAIL_TOKEN_CONTEXT,
} from "./SiteAuditDetailContext";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { SiteAuditDetailViewModel } from "../api";
import SiteAuditCheckResult from "../models/SiteAuditCheckResultModel";

enum SelectedPageType {
  AllPages,
  AllChecks,
  FilteredCheck,
}

@customElement("seotoolkit-site-audit-detail")
export default class SiteAuditDetailWorkspace extends UmbLitElement {
  #context?: SiteAuditDetailContext;

  @state()
  _model?: SiteAuditDetailViewModel;

  @state()
  _errors = 0;

  @state()
  _warnings = 0;

  @state()
  _pageType: SelectedPageType = SelectedPageType.AllPages;

  @state()
  _pageIndex = 0;

  @state()
  _checkResults: SiteAuditCheckResult[] = [];

  constructor() {
    super();

    this.consumeContext(ST_SITEAUDIT_DETAIL_TOKEN_CONTEXT, (instance) => {
      this.#context = instance;

      this.#context.model.subscribe((value) => {
        this._model = value;

        let errors = 0;
        let warnings = 0;
        this._checkResults = [];
        this._model.pagesCrawled
          ?.flatMap((item) => item.results)
          .forEach((result) => {
            if (result?.isError) {
              errors++;
            }
            if (result?.isWarning) {
              warnings++;
            }
            if (result?.isError || result?.isWarning) {
              const existingCheckResult = this._checkResults.find(
                (check) => check.id === result.checkId
              );
              if (!existingCheckResult) {
                this._checkResults.push({
                  id: result.checkId,
                  count: 1,
                  isError: result.isError,
                  isWarning: result.isWarning,
                });
              } else {
                existingCheckResult.count++;
              }
            }
          });
        this._errors = errors;
        this._warnings = warnings;
      });
    });
  }

  getCheckById(id: number) {
    return this._model?.checks?.find((item) => item.id == id);
  }

  getPagesPaged() {
    return (
      this._model?.pagesCrawled?.slice(
        this._pageIndex * 10,
        this._pageIndex * 10 + 10
      ) ?? []
    );
  }

  #back() {
    location.href = "/umbraco/seotoolkit";
  }

  override render() {
    return html`
      <div class="site-audit-detail">
        <div class="button-bar">
          <div class="left">
            <uui-button
              slot="actions"
              id="back"
              label="Back"
              look="outline"
              @click="${this.#back}"
            >
              Back
            </uui-button>
          </div>
          <div class="right">Dropdown here</div>
        </div>
        <uui-box headline="${this._model?.name!}">
          <div slot="header" class="status-header">
            <div class="flex gap">
              <div class="flex gap align-center">
                <uui-icon
                  name="icon-delete"
                  style="color: var(--uui-color-danger);"
                ></uui-icon>
                ${this._errors}
              </div>
              <div class="flex gap align-center">
                <uui-icon
                  name="icon-info"
                  style="color: var(--uui-color-warning);"
                ></uui-icon>
                ${this._warnings}
              </div>
              <div class="flex gap align-center">
                <uui-icon name="icon-document"></uui-icon>
                <span>${this._model?.pagesCrawled?.length ?? 0}</span>
                ${when(
                  this._model?.progress !== 100,
                  () => `/${this._model?.totalPagesFound}`
                )}
              </div>
            </div>
          </div>
          <uui-progress-bar .progress=${this._model?.progress ?? 0}>
          </uui-progress-bar>

          <h4>Status: ${this._model?.status}</h4>
          ${when(
            this._model?.status === "Scheduled",
            () => html`
              <p ng-if="vm.audit.status === 'Scheduled'">
                Your site audit will begin within a minute
              </p>
            `
          )}

          <hr />
          <h4>Summary</h4>
          <div class="siteaudit-results">
            ${repeat(
              this._checkResults,
              (result) => result.id,
              (result) => html`
                <i
                  class="icon-delete color-red"
                  ng-if="checkResultValue.isError"
                ></i>
                <i
                  class="icon-info color-orange"
                  ng-if="checkResultValue.isWarning"
                ></i>
                <a ng-click="vm.filterResultsOnCheck(checkResultKey)"
                  >${this.getCheckById(result.id)?.errorMessage}
                  (${result.count} times)</a
                >
              `
            )}
          </div>
        </uui-box>

        <div class="navigation-buttons">
          <uui-button label="All pages" look="primary">
            All pages
          </uui-button>
          <uui-button label="All check" look="primary">
            All checks
          </uui-button>
        </div>

        ${when(
          this._pageType === SelectedPageType.AllPages,
          () => html`
            <uui-box headline="All pages">
              <div>
                ${repeat(
                  this.getPagesPaged(),
                  (item) => item.url,
                  (item) => html`
                <div
                      class="umb-panel-group__details-status"
                      style="justify-content: space-between;"
                    >
                      <div style="flex: 1;">${item.url}</div>
                      <div style="flex: 1;">
                        Status:
                        <span
                          ng-class="{'error-status': page.statusCode < 200 || page.statusCode > 299}"
                          >${item.statusCode}</span
                        >
                      </div>
                      <div
                        class="umb-healthcheck-messages"
                        style="margin: 0; flex: 1;"
                      >
                        <div
                          class="umb-healthcheck-message"
                          ng-show="page.errors > 0"
                          style="margin: 0;"
                        >
                          <i
                            class="icon-delete color-red"
                            aria-hidden="true"
                          ></i>
                          ${item.results?.reduce(
                            (prev, cur) => prev + (cur.isError ? 1 : 0),
                            0
                          )}
                        </div>
                        <div
                          class="umb-healthcheck-message"
                          ng-show="page.warnings > 0"
                          style="margin: 0;"
                        >
                          <i
                            class="icon-info color-orange"
                            aria-hidden="true"
                          ></i>
                          ${item.results?.reduce(
                            (prev, cur) => prev + (cur.isWarning ? 1 : 0),
                            0
                          )}
                        </div>
                      </div>
                      <a ng-click="vm.openPage(page)" ng-show="!page.show">
                        Open
                      </a>
                      <a ng-click="vm.closePage(page)" ng-show="page.show">
                        Close
                      </a>
                    </div>
                    <div
                      class="umb-panel-group__details-status"
                      ng-show="page.show"
                      style="padding: 0 20px 15px 40px; border-top: none; display: block;"
                    >
                    ${repeat(
                      item.results ?? [],
                      (result) => result.checkId,
                      (result) => result.message
                    )}
                      
                      <div ng-show="page.results.length == 0">
                        No results for this page!
                      </div>
                    </div>
                  </div>
              `
                )}
              </div>
            </uui-box>
          `
        )}
      </div>

      <div class="umb-dashboard umb-scrollable row-fluid">
        <div class="umb-dashboard__content">
          <div ng-if="!vm.isLoading">
            <umb-editor-sub-header>
              <umb-editor-sub-header-content-left>
                <umb-button
                  type="button"
                  label="Back"
                  action="vm.back()"
                  button-style="outline"
                >
                </umb-button>
              </umb-editor-sub-header-content-left>
              <umb-editor-sub-header-content-right>
                <div class="pull-right">
                  <umb-button
                    type="button"
                    label="Actions"
                    action="vm.toggle()"
                    button-style="outline"
                    show-caret="true"
                  >
                  </umb-button>
                  <umb-dropdown
                    ng-if="vm.dropdownOpen"
                    on-close="vm.close()"
                    umb-keyboard-list
                    class="siteaudit-actions umb-actions"
                  >
                    <umb-dropdown-item ng-repeat="item in vm.items">
                      <button
                        type="button"
                        class="btn-reset"
                        ng-click="vm.select(item)"
                        ng-show="!item.visibleFunc || item.visibleFunc()"
                      >
                        <i class="icon {{item.icon}}"></i>
                        <span class="menu-label">{{ item.name }}</span>
                      </button>
                    </umb-dropdown-item>
                  </umb-dropdown>
                </div>
              </umb-editor-sub-header-content-right>
            </umb-editor-sub-header>

            <umb-box>
              <div class="umb-box-header">
                {{vm.audit.name}}
                <div>
                  <div class="umb-healthcheck-message" style="margin: 0;">
                    <i class="icon-delete color-red" aria-hidden="true"></i>
                    {{vm.errors}}
                  </div>
                  <div class="umb-healthcheck-message" style="margin: 0;">
                    <i class="icon-info color-orange" aria-hidden="true"></i>
                    {{vm.warnings}}
                  </div>
                  <div class="umb-healthcheck-message" style="margin: 0;">
                    <i class="icon-document" aria-hidden="true"></i>
                    <span>{{vm.audit.pagesCrawled.length}}</span>
                    <span ng-if="vm.audit.progress !== 100"
                      >/{{vm.audit.totalPagesFound}}</span
                    >
                  </div>
                </div>
              </div>
              <umb-progress-bar
                class="siteaudit-progress"
                percentage="{{vm.audit.progress}}"
                data-test="{{vm.audit.progress}}"
              >
              </umb-progress-bar>
              <div class="umb-box-content">
                <h4>Status: {{vm.audit.status}}</h4>
                <p ng-if="vm.audit.status === 'Scheduled'">
                  Your site audit will begin within a minute
                </p>
                <hr />
                <h4>Summary</h4>
                <div class="siteaudit-results">
                  <div
                    ng-repeat="(checkResultKey, checkResultValue) in vm.checkResults"
                  >
                    <i
                      class="icon-delete color-red"
                      ng-if="checkResultValue.isError"
                    ></i>
                    <i
                      class="icon-info color-orange"
                      ng-if="checkResultValue.isWarning"
                    ></i>
                    <a ng-click="vm.filterResultsOnCheck(checkResultKey)"
                      >{{vm.getCheckById(checkResultKey).errorMessage}}
                      ({{checkResultValue.count}} times)</a
                    >
                  </div>
                </div>
                <!--<canvas id="myChart" ng-init="vm.initChart()" width="400" height="400"></canvas>-->
              </div>
            </umb-box>
            <div class="umb-packages-section">
              <div class="umb-packages-categories">
                <button
                  type="button"
                  class="umb-packages-category -first"
                  style="max-width: 100%"
                  ng-click="vm.setOverviewPage('allPages')"
                >
                  All pages
                </button>
                <button
                  type="button"
                  class="umb-packages-category -last"
                  style="max-width: 100%"
                  ng-click="vm.setOverviewPage('allChecks')"
                >
                  All checks
                </button>
              </div>
            </div>
            <div
              class="umb-panel-group__details-group"
              ng-if="vm.overviewPage == 'allPages'"
            >
              <div class="umb-panel-group__details-group-title">
                <div class="umb-panel-group__details-group-name">
                  All Crawled pages
                </div>
                <div>
                  <umb-toggle
                    checked="vm.onlyShowIssues"
                    on-click="vm.toggleShowIssues()"
                    show-labels="true"
                    label-on="Only showing items with issues"
                    label-off="No issue filter"
                  >
                  </umb-toggle>
                </div>
              </div>
              <div class="umb-panel-group__details-checks">
                <div class="umb-panel-group__details-check">
                  <div ng-repeat="page in vm.pages">
                    <div
                      class="umb-panel-group__details-status"
                      style="justify-content: space-between; padding-left: 20px; padding-right: 20px;"
                    >
                      <div style="flex: 1;">{{page.url}}</div>
                      <div style="flex: 1;">
                        Status:
                        <span
                          ng-class="{'error-status': page.statusCode < 200 || page.statusCode > 299}"
                          >{{page.statusCode}}</span
                        >
                      </div>
                      <div
                        class="umb-healthcheck-messages"
                        style="margin: 0; flex: 1;"
                      >
                        <div
                          class="umb-healthcheck-message"
                          ng-show="page.errors > 0"
                          style="margin: 0;"
                        >
                          <i
                            class="icon-delete color-red"
                            aria-hidden="true"
                          ></i>
                          {{page.errors}}
                        </div>
                        <div
                          class="umb-healthcheck-message"
                          ng-show="page.warnings > 0"
                          style="margin: 0;"
                        >
                          <i
                            class="icon-info color-orange"
                            aria-hidden="true"
                          ></i>
                          {{page.warnings}}
                        </div>
                      </div>
                      <a ng-click="vm.openPage(page)" ng-show="!page.show">
                        Open
                      </a>
                      <a ng-click="vm.closePage(page)" ng-show="page.show">
                        Close
                      </a>
                    </div>
                    <div
                      class="umb-panel-group__details-status"
                      ng-show="page.show"
                      style="padding: 0 20px 15px 40px; border-top: none; display: block;"
                    >
                      <div
                        ng-repeat="result in page.results"
                        ng-show="page.results.length > 0"
                      >
                        {{result.message}}
                      </div>
                      <div ng-show="page.results.length == 0">
                        No results for this page!
                      </div>
                    </div>
                  </div>
                </div>
                <div ng-if="vm.pagination.totalPages > 1">
                  <umb-pagination
                    page-number="vm.pagination.pageNumber"
                    total-pages="vm.pagination.totalPages"
                    on-next="vm.nextPage"
                    on-prev="vm.prevPage"
                    on-change="vm.changePage"
                    on-go-to-page="vm.goToPage"
                    class="siteaudit-pagination"
                  >
                  </umb-pagination>
                </div>
              </div>
            </div>

            <div
              class="umb-panel-group__details-group"
              ng-if="vm.overviewPage == 'allChecks'"
            >
              <div class="umb-panel-group__details-group-title">
                <div class="umb-panel-group__details-group-name">
                  All checks
                </div>
              </div>
              <div class="umb-panel-group__details-checks">
                <div class="umb-panel-group__details-check">
                  <div ng-repeat="check in vm.audit.checks">
                    <div
                      class="umb-panel-group__details-status"
                      style="justify-content: space-between; padding-left: 20px; padding-right: 20px;"
                    >
                      <div style="flex: 1;">{{check.name}}</div>
                      <div
                        class="umb-healthcheck-messages"
                        style="margin: 0; flex: 1;"
                        ng-show="vm.checkResults[check.id]"
                      >
                        <div
                          class="umb-healthcheck-message"
                          ng-show="vm.checkResults[check.id].isError"
                          style="margin: 0;"
                        >
                          <i
                            class="icon-delete color-red"
                            aria-hidden="true"
                          ></i>
                          {{vm.checkResults[check.id].count}}
                        </div>
                        <div
                          class="umb-healthcheck-message"
                          ng-show="vm.checkResults[check.id].isWarning"
                          style="margin: 0;"
                        >
                          <i
                            class="icon-info color-orange"
                            aria-hidden="true"
                          ></i>
                          {{vm.checkResults[check.id].count}}
                        </div>
                      </div>
                      <a ng-click="vm.filterResultsOnCheck(check.id)">
                        Show occurrences
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="umb-panel-group__details-group"
              ng-if="vm.overviewPage == 'filteredCheck'"
            >
              <div class="umb-panel-group__details-group-title">
                <div class="umb-panel-group__details-group-name">
                  {{vm.filterCheck.name}}
                </div>
              </div>
              <div class="umb-panel-group__details-checks">
                <div class="umb-panel-group__details-check">
                  <div ng-repeat="page in vm.pages">
                    <div
                      class="umb-panel-group__details-status"
                      style="justify-content: space-between; padding-left: 20px; padding-right: 20px;"
                    >
                      <div style="flex: 1;">{{page.url}}</div>
                      <div
                        class="umb-healthcheck-messages"
                        style="margin: 0; flex: 1;"
                      >
                        <div
                          class="umb-healthcheck-message"
                          ng-show="page.errors > 0"
                          style="margin: 0;"
                        >
                          <i
                            class="icon-delete color-red"
                            aria-hidden="true"
                          ></i>
                          {{page.errors}}
                        </div>
                        <div
                          class="umb-healthcheck-message"
                          ng-show="page.warnings > 0"
                          style="margin: 0;"
                        >
                          <i
                            class="icon-info color-orange"
                            aria-hidden="true"
                          ></i>
                          {{page.warnings}}
                        </div>
                      </div>
                      <a ng-click="vm.openPage(page)" ng-show="!page.show">
                        Open
                      </a>
                      <a ng-click="vm.closePage(page)" ng-show="page.show">
                        Close
                      </a>
                    </div>
                    <div
                      class="umb-panel-group__details-status"
                      ng-show="page.show"
                      style="padding: 0 20px 15px 40px; border-top: none; display: block;"
                    >
                      <div
                        ng-repeat="result in page.results | filter:vm.resultFilter"
                        ng-show="page.results.length > 0"
                      >
                        {{result.message}}
                      </div>
                      <div ng-show="page.results.length == 0">
                        No results for this page!
                      </div>
                    </div>
                  </div>
                </div>
                <div ng-if="vm.pagination.totalPages > 1">
                  <umb-pagination
                    page-number="vm.pagination.pageNumber"
                    total-pages="vm.pagination.totalPages"
                    on-next="vm.nextPage"
                    on-prev="vm.prevPage"
                    on-change="vm.changePage"
                    on-go-to-page="vm.goToPage"
                    class="siteaudit-pagination"
                  >
                  </umb-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = [
    css`
      .site-audit-detail {
        height: 100%;
        overflow-y: scroll;
        padding: 20px;
      }

      .status-header {
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }

      .navigation-buttons{
        width: 100%;
        display: flex;
        gap: 8px;
        margin: 20px 0 20px 0;
        
        > * {
          flex: 1;
        }
      }

      .flex {
        display: flex;
      }

      .gap {
        gap: 4px;
      }

      .align-center {
        align-items: center;
      }
    `,
  ];
}
