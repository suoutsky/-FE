/**
 * Created by admin on 16/7/4.
 */
function add(a,b)
{
    console.log(a+b);
}
function sub(a,b)
{
    console.log(a-b);
}

add.call(sub,3,1);