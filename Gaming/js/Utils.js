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