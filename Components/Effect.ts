class Effect{
    name: string;
    discovered: boolean;
    willBeDiscovered: boolean; //Whether the effect will be discovered if current mixture created (only 'true' if ingredient is one of the 2-3 selected in mixture)
    willHaveEffect: boolean; //Whether the effect will be in the current mixture if it's created (only 'true' if ingredient is one of the 2-3 selected in mixture)
    currentDiscoveryValue: number; //0 if not a new discovery in this mixture, otherwise 1
    
    constructor(_effectName: string, _discovered: boolean){
        this.name = _effectName;
        this.discovered = _discovered;
    }
}

export = Effect;