import { selections } from './selections';
import { _arrayDiff } from '../../../../../utils';

export default function prepareActionsList(
  carrier,
  carrierData,
  selectionsData = []
) {
  const oppositeRuleMap = {
    hide: 'show',
    show: 'hide',
    disable: 'enable',
    enable: 'disable',
    require: 'unrequire',
    unrequire: 'require',
  };

  function processRule(rule, actionLists) {
    const selectedMasters = [];

    selections
      .getSelectionValuesInCompoundFormat(carrier, selectionsData)
      .forEach((selection) => {
        const selectionIsMaster = rule.masters.indexOf(selection.code) !== -1;
        const valuesMatch = (() => {
          if (rule.trigger_value === '*') {
            // The '*' value matches any "truthy" value
            return !!selection.value;
          }
          // Otherwise, we need an exact match */
          return selection.value === rule.trigger_value;
        })();

        if (selectionIsMaster && valuesMatch) {
          selectedMasters.push(selection);
        }
      });

    const list = selectedMasters.length
      ? rule.action
      : oppositeRuleMap[rule.action];

    // eslint-disable-next-line no-param-reassign
    actionLists[list] = [...new Set([...actionLists[list], ...rule.subjects])];
  }

  const processRules = (rules) => {
    const actionLists = {
      disable: [],
      enable: [],
      hide: [],
      show: [],
      require: [],
      unrequire: [],
    };

    rules.forEach((rule) => {
      processRule(rule, actionLists);
    });

    return actionLists;
  };

  const enforceCompatibility = () => {
    if (!carrier) {
      return {};
    }

    if (!carrierData) {
      return {};
    }

    const actionLists = processRules(carrierData.compatibility_data);

    // /** Don't enable/show shipping options that another rule will disable/hide */
    actionLists.enable = _arrayDiff(actionLists.enable, actionLists.disable);
    actionLists.show = _arrayDiff(actionLists.show, actionLists.hide);
    actionLists.unrequire = _arrayDiff(
      actionLists.unrequire,
      actionLists.require
    );

    return actionLists;
  };

  return enforceCompatibility;
}
