
// @ts-check
class FastNoise {
    // @ts-check
    static NoiseType ={
        OpenSimplex2: "OpenSimplex2",
        OpenSimplex2S: "OpenSimplex2S",
        Cellular: "Cellular",
        Perlin: "Perlin",
        ValueCubic: "ValueCubic",
        Value: "Value",
    }

    static RotationType3D ={
        None: "None",
        ImproveXYPlanes: "ImproveXYPlanes",
        ImproveXZPlanes: "ImproveXZPlanes",
    }
    
    static FractalType ={
        None: "None",
        FBm: "FBm",
        Ridged: "Ridged",
        PingPong: "PingPong",
        DomainWarpProgressive: "DomainWarpProgressive",
        DomainWarpIndependent: "DomainWarpIndependent",
    }

    static CellularDistanceFunction ={
        Euclidean: "Euclidean",
        EuclideanSq: "EuclideanSq",
        Manhattan: "Manhattan",
        Hybrid: "Hybrid",
    }

    static CellularReturnType ={
        CellValue: "CellValue",
        Distance: "Distance",
        Distance2: "Distance2",
        Distance2Add: "Distance2Add",
        Distance2Sub: "Distance2Sub",
        Distance2Mul: "Distance2Mul",
        Distance2Div: "Distance2Div",
    }

    static DomainWarpType ={
        OpenSimplex2: "OpenSimplex2",
        OpenSimplex2Reduced: "OpenSimplex2Reduced",
        BasicGrid: "BasicGrid",
    }

    static TransformType3D ={
        None: "None",
        ImproveXYPlanes: "ImproveXYPlanes",
        ImproveXZPlanes: "ImproveXZPlanes",
        DefaultOpenSimplex2: "DefaultOpenSimplex2",
    }

    //private
    #Seed = 1337;
    #Frequency = 0.01;
    #NoiseType = FastNoise.NoiseType.OpenSimplex2;
    #RotationType3D = FastNoise.RotationType3D.None;
    #TransformType3D = FastNoise.TransformType3D.DefaultOpenSimplex2;
    #DomainWarpAmp = 1.0;

    #FractalType = FastNoise.FractalType.None;
    #Octaves = 3;
    #Lacunarity = 2.0;
    #Gain = 0.5;
    #WeightedStrength = 0.0;
    #PingPongStength = 2.0;

    #FractalBounding = 1 / 1.75;

    #CellularDistanceFunction = FastNoise.CellularDistanceFunction.EuclideanSq;
    #CellularReturnType = FastNoise.CellularReturnType.Distance;
    #CellularJitterModifier = 1.0;

    #DomainWarpType = FastNoise.DomainWarpType.OpenSimplex2;
    #WarpTransformType3D = FastNoise.TransformType3D.DefaultOpenSimplex2;

   // con


    SetSeed(seed){
        this.#Seed = seed;
    }

    SetFrequency(frequency){
        this.#Frequency = frequency;
    }

    SetNoiseType(noiseType){
        this.#NoiseType = noiseType;
       // UpdateTransformType3D(); //TODO: add
    }

    SetRotationType3D(rotationType3D){
        this.#RotationType3D = rotationType3D;
        //UpdateTransformType3D(); //TODO: add
        //UpdateWarpTransformType3D(); //TODO: add
    }

    SetFractalType(fractalType){
        this.#FractalType = fractalType;
    }

    SetFractalOctaves(octaves){
        this.#Octaves = octaves;
        //CalculateFractalBounding(); //TODO: add
    }

    SetFractalLacunarity(lacunarity){
        this.#Lacunarity = lacunarity;
    }

    SetFractalGain(gain){
        this.#Gain = gain;
        //CalculateFractalBounding(); //TODO: add
    }

    SetFractalWeightedStrength(weightedStrength){
        this.#WeightedStrength = weightedStrength;
    }

    SetFractalPingPongStrength(pingPongStrength){
        this.#PingPongStength = pingPongStrength;
    }

    SetCellularDistanceFunction(cellularDistanceFunction){
        this.#CellularDistanceFunction = cellularDistanceFunction;
    }

    SetCellularReturnType(cellularReturnType){
        this.#CellularReturnType = cellularReturnType;
    }

    SetCellularJitter(cellularJitter){
        this.#CellularJitterModifier = cellularJitter;
    }

    SetDomainWarpType(domainWarpType){
        this.#DomainWarpType = domainWarpType;
        //UpdateWarpTransformType3D(); //TODO: add
    }

    SetDomainWarpAmp(domainWarpAmp){
        this.#DomainWarpAmp = domainWarpAmp;
    }
    
    GetNoise(x,y,z){
        if (x == undefined){
            x *= this.#Frequency;
            y *= this.#Frequency;

            switch (this.#NoiseType) {
                case FastNoise.NoiseType.OpenSimplex2:
                case FastNoise.NoiseType.OpenSimplex2S:
                    const SQRT3 = 1.7320508075688772935274463415059;
                    const F2 = 0.5 * (SQRT3 -1);
                    let t = (x+y) * F2;
                    x += t;
                    y += t;
                    break;
        
                default:
                    break;
            }   

            switch (this.#FractalType) { //add methods
                default:
                    return //GenNoiseSingle(this.#Seed, x , y);
                case FastNoise.FractalType.FBm:
                    return //GenFractalFBn(x,y);
                case FastNoise.FractalType.Ridged:
                    return //GenFractalRidged(x, y);
                case FastNoise.FractalType.PingPong:
                    return //GenFractalPingPong(x, y);
            }
        } else {
            x *= this.#Frequency;
            y *= this.#Frequency;
            z *= this.#Frequency;
        
            switch (this.#TransformType3D) {
                case FastNoise.TransformType3D.ImproveXYPlanes:
                {
                    let xy = x + y;
                    let s2 =xy * -0.211324865405187;
                    z *= 0.577350269189626;
                    x += s2 - z;
                    y += s2 - z;
                    z += xy * 0.577350269189626;
                    break;
                }
                case FastNoise.TransformType3D.ImproveXZPlanes:
                {
                    let xz = x + z;
                    let s2 =xz * -0.211324865405187;
                    y *= 0.577350269189626;
                    x += s2 - y;
                    z += s2 - y;
                    y += xz * 0.577350269189626;
                    break;
                }
                case FastNoise.TransformType3D.DefaultOpenSimplex2:
                    const R3 = 2.0/3.0;
                    let r = (x + y + z) * R3;
                    x = r - x;
                    y = r - y;
                    z = r - z;
                    break;
                default:
                    break;
            }

            switch (this.#FractalType) { //add methods
                default:
                    return //GenNoiseSingle(this.#Seed, x , y, z);
                case FastNoise.FractalType.FBm:
                    return //GenFractalFBn(x,y,z);
                case FastNoise.FractalType.Ridged:
                    return //GenFractalRidged(x, y, z);
                case FastNoise.FractalType.PingPong:
                    return //GenFractalPingPong(x, y, z);
            }
        }
        
    }
    

    /**
     * 
     * @param {Vector2|Vector3} coord 
     */
    DomainWrap(coord){
            switch (this.#FractalType) {
                default:
                    //DomainWrapSinge(coord);
                    break;
                case FastNoise.FractalType.DomainWarpProgressive:
                    //DomainWarpFractalProgressive(coord);
                    break;
                case FastNoise.FractalType.DomainWarpIndependent:
                    //DomainWarpFractalIndependent(coord);
                    break;
            }
    }
    
    
    static whatwew = [
        2,3,4,5,6,3,2,2,3,4,5,4
    ]
    
    whatd

    


}

class Vector2 {
    /**
     * 2d Vector
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Vector3 {
    /**
     * 3d Vector
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x,y,z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

var vec = new Vector3(2,1,1);
var noise = new FastNoise();
noise.DomainWrap(vec);
