import express, { Request, Response } from 'express'
import bookDB from '../../models/Category'
exports.normal = (req, res) => {
    console.log('zashel');
    var title = req.params.searchTitle.split(' ');

    if(!title){
        return res.status(400).send({message: "Enter something"})
    }
    console.log("1");
    let dbs = bookDB.find().exec();
    res.send(dbs);
    console.log(dbs);
    for (let i=0;i<dbs.length;i++)
    {
        if (jaro_winkler(tittle,dbs[i].name)>=0.8){
            console.log(title + " ====== " );
            console.log(dbs[i]);
        }
    }
    console.log("3");
    console.log(dbs);
}
function jaro_winkler(s1,s2){
    if (s1==s2)
    return 1;
    let l1=s1.length,l2=s2.length;
    if (!l1 || !l2)
    {
        return 0;
    }
    let m=0,t=0,dj,range = floor(max(l1,l2)/2)-1,match1=new Array(s1.length),match2=new Array(s2.length);
    for (i=0;i<min(l1,l2);i++)
    {
        for (j=max(0,i-range);j<min(l2,i+range+1);j++)
        {
            if (!match1[i] && !match2[j] && s[i]==s[j])
            {
                m++;
                match1[i]=match2[j]=true;
                break;
            }
        }
    }
    if (!m)
    return 0;
    let k=0;
    for (i=0;i<l1;i++)
    {
        if (match1[i])
        for (j=k;j<l2;j++)
        {
            if (match2[j])
            {
                k=j+1;
                break;
            }
        }
        if ( s1[i] != s2[j] ) {
            t++;
        }
    }
    t/=2;
    dj=(m/l1+m/l2+(m-t)/m)/3;
    if (dj>=0.7)
    {
        let i,l;
        i=l=0;
        while (s1[i]==s2[i] && i<min(min(l1,l2),4))
        {
            l++;
        }
        dj=dj + l * 0.1 * (1 - dj);
    }
    return dj;
}