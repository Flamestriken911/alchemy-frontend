class Effect{
    effectName: string;
    discovered: boolean;
    
    constructor(_effectName: string, _discovered: boolean){
        this.effectName = _effectName;
        this.discovered = _discovered;
    }
}

export = Effect;