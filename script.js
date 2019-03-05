function makeList(data)
{
    if (data === undefined)
        return '';
    let res = '';
    res += '<ul>';
    for(let i = 0;i<data.length;i++)
    {   
        res += '<li>';
        if(data[i].name === undefined)
            throw  new Error('каждый объект обязательно должен иметь поле "name"');
        
        res += data[i].name;     
        res +=  makeList(data[i].children);
        res += '</li>';
    }
    res += '</ul>';
    return res;
}

function parse()
{
    let inp = document.getElementById('inp');
    let objData;
    try {
        objData = JSON.parse(inp.value);
    } catch (error) {
        alert('строка не соответствует синтаксису JSON');
        return;
    }   
    try {
        document.write(makeList(objData));    
    } catch (e) {
        alert(e.message);
        return;
    }
}