import React, { useEffect, useState } from 'react';
import { MessageTypes, GetOptionsResponse, UpdateOptionRequest } from '../messages';
import logo from '../../public/icon32.png';

const OptionPage = () => {

  const [useStandardPrefix, setUseStandardPrefix] = useState(false);

  const updatePrefixOption = ({ optionValue }: { optionValue: boolean }) => {
    setUseStandardPrefix(optionValue);
    const message: UpdateOptionRequest = {
      type: MessageTypes.UPDATE_OPTION_REQUEST,
      options: {
        enableStandardPrefix: optionValue
      }
    };
    chrome.runtime.sendMessage(message);
  }

  useEffect(() => {
    chrome.runtime.sendMessage({ type: MessageTypes.GET_OPTIONS_REQUEST },
      (data: GetOptionsResponse) => {
        setUseStandardPrefix(!!data?.options?.enableStandardPrefix)
      });
  }, []);

  return (
    <div className="container">
      <header>
        <h1 className="title header--extension-name">
          <img src={logo} className="header--logo"/>
          Branch name from Jira issue
        </h1>
        <h2 className="title header--title">Settings</h2>
      </header>

      <h4 className="section-title">General</h4>
      <div className="checkbox">
        <label>
          <input type="checkbox" />
          <span>Add <code>git checkout -b</code> when copying to clipboard</span>
        </label>
      </div>
      <div className="inputtext">
        <label htmlFor="truncate-to">
          <span>Truncate branch name to <code>n</code> characters</span>
        </label>
        <input type="number" id="truncate-to" />
      </div>
      <div className="button">
        <label htmlFor="reset-to-defaults">
          <span>Reset to defaults</span>
        </label>
        <button id="reset-to-defaults" className="importButton ui-button ui-corner-all ui-widget" type="submit">
          <span>Reset</span>
        </button>
      </div>

      <h4 className="section-title">Prefixes</h4>
      <div className="checkbox">
        <label>
          <input
            id="useStandardPrefix"
            type="checkbox"
            checked={useStandardPrefix}
            onChange={(event) => updatePrefixOption({ optionValue: event.currentTarget.checked })}
          />
          <span>Add git prefixes to the branch name. E.g. <code>feat/story-001-do-something</code></span>
        </label>
      </div>

      <div className="inputtext">
        <input type="number" id="truncate-to" />
        <label htmlFor="truncate-to">
          <span>Truncate branch name to <code>n</code> characters</span>
        </label>
      </div>


      <div className="multivalue">
        <select id="prefixes" size={8} multiple/>
        <button>- Remove selected</button>
      </div>


      {/* <h4 id="privacy-settings-header" className="i18n_options_privacy_settings">Section 1</h4>

      <div className="checkbox" id="disable-hyperlink-auditing" >
        <label>
          <input type="checkbox" id="disable-hyperlink-auditing-checkbox" />
          <span>
            <span className="i18n_options_disable_hyperlink_auditing"></span>
            <a href="https://www.bleepingcomputer.com/news/software/major-browsers-to-prevent-disabling-of-click-tracking-privacy-risk/" target="_blank"><span className="ui-icon ui-icon-circle-b-help"></span></a>
          </span>
        </label>
      </div>
      <div className="checkbox" id="disable-network-prediction" >
        <label>
          <input type="checkbox" id="disable-network-prediction-checkbox" />
          <span>
            <span className="i18n_options_disable_network_prediction"></span>
            <a id="disable-network-prediction-help-link" href="https://www.google.com/intl/en/chrome/privacy/whitepaper.html#netpredict" target="_blank"><span className="ui-icon ui-icon-circle-b-help"></span></a>
          </span>
        </label>
      </div>
      <div className="checkbox" id="disable-google-nav-error-service" >
        <label>
          <input type="checkbox" id="disable-google-nav-error-service-checkbox" />
          <span>
            <span className="i18n_options_disable_google_nav_error_service"></span>
            <a href="https://www.google.com/chrome/privacy/#how-chrome-handles-your-information" target="_blank"><span className="ui-icon ui-icon-circle-b-help"></span></a>
          </span>
        </label>
      </div>
      <div className="checkbox" id="disable-floc" >
        <label>
          <input type="checkbox" id="disable-floc-checkbox" />
          <span>
            <span className="i18n_options_disable_floc"></span>
            <a href="https://www.eff.org/deeplinks/2021/03/googles-floc-terrible-idea" target="_blank"><span className="ui-icon ui-icon-circle-b-help"></span></a>
          </span>
        </label>
      </div>

      <h4 className="i18n_options_advanced_settings"></h4>

      <div className="checkbox">
        <label>
          <input type="checkbox" id="local-learning-checkbox" />
          <span>
            <span className="i18n_options_learn_setting"></span>
            <span className="ui-icon ui-icon-alert tooltip" title="i18n_local_learning_warning"></span>
            <a href="https://www.eff.org/badger-evolution" target="_blank"><span className="ui-icon ui-icon-circle-b-help"></span></a>
          </span>
        </label>
      </div>
      <div id="learning-setting-divs" >
        <div className="checkbox indent1">
          <label>
            <input type="checkbox" id="show-nontracking-domains-checkbox" disabled />
            <span className="i18n_options_show_nontracking_domains_checkbox"></span>
          </label>
        </div>
        <div className="checkbox indent1">
          <label>
            <input type="checkbox" id="learn-in-incognito-checkbox" disabled />
            <span>
              <span className="i18n_options_incognito_setting"></span>
              <span className="ui-icon ui-icon-alert tooltip" title="i18n_options_incognito_warning"></span>
            </span>
          </label>
        </div>
      </div>
      <div className="checkbox" id="webRTCToggle" >
        <label>
          <input type="checkbox" id="toggle_webrtc_mode" />
          <span>
            <span className="i18n_options_webrtc_setting"></span>
            <span className="ui-icon ui-icon-alert tooltip" title="i18n_options_webrtc_warning"></span>
          </span>
        </label>
      </div>

    </div>) */}
    </div>)

  {/* 
<!DOCTYPE html>

<!--
 - This file is part of Privacy Badger <https://privacybadger.org/>
 - Copyright (C) 2014 Electronic Frontier Foundation
 -
 - Derived from Adblock Plus
 - Copyright (C) 2006-2013 Eyeo GmbH
 -
 - Privacy Badger is free software: you can redistribute it and/or modify
 - it under the terms of the GNU General Public License version 3 as
 - published by the Free Software Foundation.
 -
 - Privacy Badger is distributed in the hope that it will be useful,
 - but WITHOUT ANY WARRANTY; without even the implied warranty of
 - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 - GNU General Public License for more details.
 -
 - You should have received a copy of the GNU General Public License
 - along with Privacy Badger.  If not, see <http://www.gnu.org/licenses/>.
 -->

<html style="visibility:hidden; overflow:hidden">
<head>
<meta name="google" content="notranslate">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link type="text/css" href="/lib/vendor/jquery-ui-1.12.1.custom/jquery-ui.structure.css" rel="stylesheet" />
<link type="text/css" href="/lib/vendor/jquery-ui-1.12.1.custom/jquery-ui.theme.css" rel="stylesheet" />
<link type="text/css" href="/lib/vendor/jquery-ui-iconfont-2.3.2/jquery-ui-1.12.icon-font.css" rel="stylesheet" />
<link type="text/css" href="/lib/vendor/tooltipster-4.2.6/tooltipster.bundle.css" rel="stylesheet" />
<link type="text/css" href="/lib/vendor/select2-4.0.11/select2-4.0.11.css" rel="stylesheet" />
<link type="text/css" media="screen" href="/lib/vendor/toggle-switch.css" rel="stylesheet" />
<link type="text/css" media="screen" href="/skin/popup.css" rel="stylesheet" />
<link type="text/css" media="screen" href="/skin/options-layout.css" rel="stylesheet" />

<script type="text/javascript" src="/lib/vendor/jquery-3.5.1.js"></script>
<script type="text/javascript" src="/lib/vendor/jquery-ui-1.12.1.custom/jquery-ui.js"></script>
<script type="text/javascript" src="/lib/vendor/tooltipster-4.2.6/tooltipster.bundle.js"></script>
<script type="text/javascript" src="/lib/vendor/select2-4.0.11/select2-4.0.11.js"></script>

<!-- required because of window.getBaseDomain() in htmlutils.js -->
<script type="text/javascript" src="/lib/publicSuffixList.js"></script>
<script type="text/javascript" src="/lib/basedomain.js"></script>

<script type="text/javascript" src="/lib/i18n.js" charset="utf-8"></script>
<script type="text/javascript" src="/js/bootstrap.js"></script>
<script type="text/javascript" src="/js/constants.js"></script>
<script type="text/javascript" src="/js/utils.js"></script>
<script type="text/javascript" src="/js/htmlutils.js"></script>
<script type="text/javascript" src="/lib/options.js"></script>
<script type="text/javascript" src="/js/options.js" charset="utf-8"></script>

<title className="i18n_options_title"></title>
</head>
<body className="options">
<header>
  <table>
    <tr>
      <td style="vertical-align:middle">
        <img src="/icons/badger-bw-noborder.svg" width="40" alt="">
      </td>
      <td style="vertical-align:middle">
        <h1><span className="i18n_options_title"></span></h1>
      </td>
    </tr>
  </table>
</header>

<div id="tabs">
  <ul>
    <li><a href="#tab-general-settings"><span className="i18n_options_general_settings"></span></a></li>
    <li><a href="#tab-allowlist"><span className="i18n_disabled_sites"></span></a></li>
    <li><a href="#tab-manage-widgets"><span className="i18n_options_widget_replacement_tab"></span></a></li>
    <li><a href="#tab-tracking-domains"><span className="i18n_options_domain_list_tab"></span></a></li>
    <li><a href="#tab-manage-data"><span className="i18n_data_settings"></span></a></li>
  </ul>

  <div id="tab-tracking-domains">
    <div id="blockedResourcesContainer">
      <p id="pbInstructions">
        <span id="options_domain_list_trackers"></span>
        <span id="options_domain_list_no_trackers" className="i18n_options_domain_list_no_trackers" style="display:none"></span>
      </p>
      <div id="tracking-domains-loader" style="display:none">
        <div className="spinner"></div>
      </div>
      <div id="tracking-domains-div">
          <ul id="tracking-domains-filters">
              <li>
                  <label for="trackingDomainSearch">
                      <span className="i18n_options_domain_search"></span>
                      <span className="ui-icon ui-icon-info tooltip" title="i18n_options_domain_search_tooltip"></span>
                  </label>
                  <input id="trackingDomainSearch" type="text" value="" autocomplete="off">
              </li>
              <li>
                  <label for="tracking-domains-type-filter">
                      <span className="i18n_options_domain_type_filter"></span>
                  </label>
                  <select id="tracking-domains-type-filter">
                      <option value="" className="i18n_options_domain_filter_all"></option>
                      <option value="user" className="i18n_options_domain_filter_user"></option>
                      <option value="dnt" className="i18n_options_domain_filter_dnt"></option>
                  </select>
              </li>
              <li>
                  <label for="tracking-domains-status-filter">
                      <span className="i18n_options_domain_status_filter"></span>
                  </label>
                  <select id="tracking-domains-status-filter">
                      <option value="" className="i18n_options_domain_filter_all"></option>
                      <option value="block" className="i18n_options_domain_filter_block"></option>
                      <option value="cookieblock" className="i18n_options_domain_filter_cookieblock"></option>
                      <option value="allow" className="i18n_options_domain_filter_allow"></option>
                  </select>
              </li>
              <li id="not-yet-blocked-filter" style="display:none">
                <label for="tracking-domains-show-not-yet-blocked">
                  <span className="i18n_options_show_not_yet_blocked"></span>
                  <span className="ui-icon ui-icon-info tooltip" title="i18n_intro_not_an_adblocker_paragraph"></span>
                </label>
                <input type="checkbox" id="tracking-domains-show-not-yet-blocked">
              </li>
          </ul>
          <div id="blockedResources"></div>
      </div>
    </div>
  </div>

  <div id="tab-allowlist">
    <div className="i18n_disabled_for_these_domains"></div>

    <form id="allowlist-form" action="#">
      <div>
        <div>
          <div style="float: left; max-width: 420px; width: 100%; margin-inline-end: 10px; padding-top: 5px">
            <input type="text" value="" id="new-disabled-site-input" placeholder="i18n_allowlist_domain_input_placeholder" autocomplete="off">
          </div>
          <div style="float: left; padding: 5px 0 10px">
            <button id="add-disabled-site" type="submit"><span className="i18n_add_domain_button"></span></button>
          </div>
        </div>
        <div style="clear: both; overflow: hidden">
          <div style="float: left; max-width: 420px; width: 100%; margin-inline-end: 10px; padding-top: 5px">
            <select id="allowlist-select" size="10" multiple></select>
          </div>
          <div style="float: left; padding-top: 5px">
            <button id="remove-disabled-site"><span className="i18n_remove_button"></span></button>
          </div>
        </div>
      </div>
    </form>
  </div>

  <div id="tab-general-settings">
    <form id="settingsForm" action="#">

      <div className="checkbox">
        <label>
          <input type="checkbox" id="show_counter_checkbox">
          <span className="i18n_show_counter_checkbox"></span>
        </label>
      </div>
      <div className="checkbox">
        <label>
          <input type="checkbox" id="enable_dnt_checkbox">
          <span className="i18n_options_enable_dnt_checkbox"></span>
        </label>
      </div>
      <div className="checkbox indent1">
        <label>
          <input type="checkbox" id="check_dnt_policy_checkbox">
          <span className="i18n_options_dnt_policy_setting"></span>
        </label>
      </div>

      <h4 id="privacy-settings-header" className="i18n_options_privacy_settings" style="display:none"></h4>

      <div className="checkbox" id="disable-hyperlink-auditing" style="display:none">
        <label>
          <input type="checkbox" id="disable-hyperlink-auditing-checkbox">
          <span>
            <span className="i18n_options_disable_hyperlink_auditing"></span>
            <a href="https://www.bleepingcomputer.com/news/software/major-browsers-to-prevent-disabling-of-click-tracking-privacy-risk/" target="_blank"><span className="ui-icon ui-icon-circle-b-help"></span></a>
          </span>
        </label>
      </div>
      <div className="checkbox" id="disable-network-prediction" style="display:none">
        <label>
          <input type="checkbox" id="disable-network-prediction-checkbox">
          <span>
            <span className="i18n_options_disable_network_prediction"></span>
            <a id="disable-network-prediction-help-link" href="https://www.google.com/intl/en/chrome/privacy/whitepaper.html#netpredict" target="_blank"><span className="ui-icon ui-icon-circle-b-help"></span></a>
          </span>
        </label>
      </div>
      <div className="checkbox" id="disable-google-nav-error-service" style="display:none">
        <label>
          <input type="checkbox" id="disable-google-nav-error-service-checkbox">
          <span>
            <span className="i18n_options_disable_google_nav_error_service"></span>
            <a href="https://www.google.com/chrome/privacy/#how-chrome-handles-your-information" target="_blank"><span className="ui-icon ui-icon-circle-b-help"></span></a>
          </span>
        </label>
      </div>
      <div className="checkbox" id="disable-floc" style="display:none">
        <label>
          <input type="checkbox" id="disable-floc-checkbox">
          <span>
            <span className="i18n_options_disable_floc"></span>
            <a href="https://www.eff.org/deeplinks/2021/03/googles-floc-terrible-idea" target="_blank"><span className="ui-icon ui-icon-circle-b-help"></span></a>
          </span>
        </label>
      </div>

      <h4 className="i18n_options_advanced_settings"></h4>

      <div className="checkbox">
        <label>
          <input type="checkbox" id="local-learning-checkbox">
          <span>
            <span className="i18n_options_learn_setting"></span>
            <span className="ui-icon ui-icon-alert tooltip" title="i18n_local_learning_warning"></span>
            <a href="https://www.eff.org/badger-evolution" target="_blank"><span className="ui-icon ui-icon-circle-b-help"></span></a>
          </span>
        </label>
      </div>
      <div id="learning-setting-divs" style="display:none">
        <div className="checkbox indent1">
          <label>
            <input type="checkbox" id="show-nontracking-domains-checkbox" disabled>
            <span className="i18n_options_show_nontracking_domains_checkbox"></span>
          </label>
        </div>
        <div className="checkbox indent1">
          <label>
            <input type="checkbox" id="learn-in-incognito-checkbox" disabled>
            <span>
              <span className="i18n_options_incognito_setting"></span>
              <span className="ui-icon ui-icon-alert tooltip" title="i18n_options_incognito_warning"></span>
            </span>
          </label>
        </div>
      </div>
      <div className="checkbox" id="webRTCToggle" style="display:none">
        <label>
          <input type="checkbox" id="toggle_webrtc_mode">
          <span>
            <span className="i18n_options_webrtc_setting"></span>
            <span className="ui-icon ui-icon-alert tooltip" title="i18n_options_webrtc_warning"></span>
          </span>
        </label>
      </div>

    </form>
  </div>

  <div id="tab-manage-widgets">
    <p><span className="i18n_options_widget_replacement_desc"></span></p>
    <p>
    <label>
      <input type="checkbox" id="replace-widgets-checkbox">
      <span className="i18n_options_social_widgets_checkbox"></span>
    </label>
    </p>

    <h4 className="i18n_options_widget_exceptions_header"></h4>

    <div style="max-width: 420px">
      <label for="hide-widgets-select">
        <span className="i18n_options_hide_social_widgets"></span>
      </label>
      <select name="states[]" multiple="multiple" id="hide-widgets-select"></select>
    </div>

    <h4 className="i18n_options_widget_site_exceptions_header"></h4>

    <div>
      <span className="i18n_options_widget_site_exceptions_label"></span>
      <form action="#">
        <div id="widget-site-exceptions-select-div">
          <select id="widget-site-exceptions-select" size="10" multiple></select>
        </div>
        <button id="widget-site-exceptions-remove-button" className="i18n_remove_button"></button>
      </form>
    </div>
  </div>

  <div id="tab-manage-data">
    <div className="btn-silo">
      <p className="i18n_manage_data_intro"></p>
      <div id="export">
        <h3><span className="i18n_export_user_data"></span></h3>
        <button id="exportTrackers"><span className="i18n_download"></span></button>
      </div>
      <div id="import">
        <h3><span className="i18n_import_user_data"></span></h3>
        <input type="file" className="importInput" id="importTrackers" accept=".json">
        <button id="importTrackerButton" className="importButton" type="submit"><span className="i18n_import"></span></button>
      </div>
    </div>
    <div className="btn-silo">
      <p className="i18n_sync_intro"></p>
      <div id="upload">
        <h3><span className="i18n_upload_cloud"></span></h3>
        <button id="cloud-upload"><span className="i18n_upload"></span></button>
      </div>
      <div id="download">
        <h3><span className="i18n_download_cloud"></span></h3>
        <button id="cloud-download"><span className="i18n_download"></span></button>
      </div>
    </div>
    <div className="btn-silo">
      <div id="reset">
        <h3><span className="i18n_reset_data"></span></h3>
        <button id="resetData" className="btn-danger"><span className="i18n_reset"></span></button>
      </div>
      <div id="remove">
        <h3><span className="i18n_remove_all_data"></span></h3>
        <button id="removeAllData" className="btn-danger"><span className="i18n_remove_all"></span></button>
      </div>
    </div>
  </div>


</div>

</body>
</html>
  */}
}

export default OptionPage;