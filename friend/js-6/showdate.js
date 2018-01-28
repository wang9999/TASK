
    today=new Date();
theYear = today.getYear();
if(theYear >= 100 && theYear < 2000) theYear=theYear-100+2000;

function MonthArray(){

    this.length=MonthArray.arguments.length;
    for(var i=0;i<this.length;i++)
        this[i+1]=MonthArray.arguments[i]

}

m=new MonthArray("January", "February", "March", "April", "May", "June", "July","August","September","October","November","December")
document.write(m[today.getMonth()+1]," ",today.getDate(),", ",theYear)

