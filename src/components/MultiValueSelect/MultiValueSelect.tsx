import React from "react";

import "./multivalueselect.css";

export const MultiValueSelect = (): JSX.Element => {
  return (
    <div className="multivalueselect__container">
      <span className="multivalueselect__label">Add custom prefixes:</span>
      <Input />
      <br />
      <Select option={["1", "2"]} />
    </div>
  );
}

const Input = () => {
  return (
    <div>
      <div className="multivalueselect__input-container">
        <input
          className="multivalueselect__input"
          type="text"
          value=""
          placeholder="e.g. username, projectname/username" autoComplete="off" />
      </div>
      <div className="multivalueselect__button-container">
        <button className="multivalueselect__button" type="submit">
          <span className="multivalueselect__button-icon multivalueselect__button-icon--plus"></span>
          <span className="multivalueselect__button-spacer"> </span>
          <span className="multivalueselect__button-label">Add prefix</span></button>
      </div>
    </div>

  );
}

const Select = ({ options }: any) => <select multiple>
  {options?.map((option: any) => <option>{option}</option>)}
</select>

{/* <div>
        <div>
          <div style="float: left; max-width: 420px; width: 100%; margin-inline-end: 10px; padding-top: 5px">
            <input type="text" value="" id="new-disabled-site-input" placeholder="e.g. www.example.com, *.example.net, example.org" autocomplete="off">
          </div>
          <div style="float: left; padding: 5px 0 10px">
            <button id="add-disabled-site" type="submit" class="ui-button ui-corner-all ui-widget"><span class="ui-button-icon ui-icon ui-icon-plus"></span><span class="ui-button-icon-space"> </span><span class="i18n_add_domain_button">Add domain</span></button>
          </div>
        </div>
        <div style="clear: both; overflow: hidden">
          <div style="float: left; max-width: 420px; width: 100%; margin-inline-end: 10px; padding-top: 5px">
            <select id="allowlist-select" size="10" multiple=""><option>127.0.0.1</option><option>*.arduino.cc</option><option>arduino.atlassian.net</option><option>www.beautifulcode.co</option><option>frontendtestfest.com</option><option>github.com</option><option>github.dev</option><option>calendar.google.com</option><option>mail.google.com</option><option>tagmanager.google.com</option><option>saas.hrzucchetti.it</option><option>europe.inspiredlms.com</option><option>medium.com</option><option>www.mtv.it</option><option>www.nytimes.com</option><option>www.sguazzi.org</option><option>*.sparklyunicorn.cc</option><option>supabase.io</option></select>
          </div>
          <div style="float: left; padding-top: 5px">
            <button id="remove-disabled-site" class="ui-button ui-corner-all ui-widget"><span class="ui-button-icon ui-icon ui-icon-minus"></span><span class="ui-button-icon-space"> </span><span class="i18n_remove_button">Remove selected</span></button>
          </div>
        </div>
      </div> */}