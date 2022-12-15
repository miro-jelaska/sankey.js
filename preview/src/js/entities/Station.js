export default class Station extends sankey.EntityBase {
    constructor(label, efficiencyLevel, efficiencyRelativeAmountLabel){
        super();
        this._label = label;
        this._efficiencyLevel = efficiencyLevel;
        this._efficiencyRelativeAmountLabel = efficiencyRelativeAmountLabel;
    }
    get label() { return this._label; }
    get efficiencyLevel() { return this._efficiencyLevel; }
    get efficiencyRelativeAmountLabel() { return this._efficiencyRelativeAmountLabel; }
}
