function Incr(variable, value, max)
{
    variable += value;
    if (variable > max)
        variable = max;
    return variable;
}

function Decr(variable, value, min)
{
    variable -= value;
    if (variable < min)
        variable = min;
    return variable;
}

function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
 
    var temp = new obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }
 
    return temp;
    /*
    return JSON.parse(JSON.stringify(obj));
    */
}