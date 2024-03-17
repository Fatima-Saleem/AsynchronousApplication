class ElectromagneticWaveCalculator 
{
    constructor(E0,k,x,omega,t,phi) 
    {
        this.E0=E0;
        this.k=k;
        this.x=x;
        this.omega=omega;
        this.t=t;
        this.phi=phi;
    }

    async calculate() 
    {
        const E0CosPhi=await this.calculateInitialAmplitude();
        const kx=await this.calculateWaveNumberTimesPosition();
        const omegaT=await this.calculateAngularFrequencyTimesTime();
        const subtractOmegaT=await this.subtractOmegaTFromKx(kx, omegaT);
        const addPhi=await this.addPhi(subtractOmegaT);
        const cosResult=await this.cosine(addPhi);
        const finalResult=await this.multiplyE0ByCos(E0CosPhi, cosResult);
        return finalResult;
    }

    calculateInitialAmplitude() 
    {
        return Promise.resolve(this.E0*Math.cos(this.phi));
    }

    calculateWaveNumberTimesPosition() 
    {
        return Promise.resolve(this.k*this.x);
    }

    calculateAngularFrequencyTimesTime() 
    {
        return Promise.resolve(this.omega*this.t);
    }

    subtractOmegaTFromKx(kx,omegaT) 
    {
        return Promise.resolve(kx-omegaT);
    }

    addPhi(subtractOmegaT) 
    {
        return Promise.resolve(subtractOmegaT+this.phi);
    }

    cosine(value) {
        return Promise.resolve(Math.cos(value));
    }

    multiplyE0ByCos(E0CosPhi, cosResult) 
    {
        return Promise.resolve(E0CosPhi*cosResult);
    }
}

function getUserInputAndCalculate() 
{
    const E0=parseFloat(prompt("Enter E0 (Amplitude):"));
    const k=parseFloat(prompt("Enter k (Wave Number):"));
    const x=parseFloat(prompt("Enter x (Position):"));
    const omega=parseFloat(prompt("Enter ω (Angular Frequency):"));
    const t=parseFloat(prompt("Enter t (Time):"));
    const phi=parseFloat(prompt("Enter φ (Phase Constant in radians):"));

    const waveCalculator=new ElectromagneticWaveCalculator(E0,k,x,omega,t,phi);
    waveCalculator.calculate().then(E=>alert(`Electric Field Intensity: ${E}`));
}

getUserInputAndCalculate();