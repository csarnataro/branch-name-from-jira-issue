import React, { useEffect, useState } from 'react';
import { MessageTypes, GetOptionsResponse, UpdateOptionRequest } from '../messages';

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

  return <div className="options">
    <h1>Options</h1>
    <input 
      id="useStandardPrefix" 
      type="checkbox" 
      checked={useStandardPrefix} 
      onChange={(event) => updatePrefixOption({ optionValue: event.currentTarget.checked })} />
    <label htmlFor="useStandardPrefix">Use git prefixes (e.g. <code>feat/</code>, <code>fix/</code>, etc) </label>
  </div>
}

export default OptionPage;