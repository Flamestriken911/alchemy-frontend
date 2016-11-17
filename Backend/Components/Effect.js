"use strict";
class Effect {
    constructor(_effectName, _discovered) {
        this.ToStorageString = () => {
            return this.name + ':' + this.discovered;
        };
        this.name = _effectName;
        this.discovered = _discovered;
        this.willHaveEffect = false;
        this.willBeDiscovered = false;
    }
}
module.exports = Effect;
//# sourceMappingURL=Effect.js.map