var groupDataInterface=function(needGroupDate,count){
    var fileCount=count;
    var startIndex=0;
    var endIndex=0;
    var currentGroupNumber=0;
    var currentGroupCount=0;
    var fileRemainCount=fileCount;

    var showHtml="";

    for(var index=0;index<needGroupDate.length;){
        var item=needGroupDate[index];
        if(currentGroupNumber==0){
            startIndex=endIndex;
            currentGroupNumber=item;
            currentGroupCount=1;
            index++;
        }else{
            //相同的项
            if(item==currentGroupNumber){
                currentGroupCount++;
                index++;
                if(currentGroupCount>fileRemainCount){
                    showHtml+="need new page.startindex is:"+startIndex+" endIndex is :"+endIndex+"\n";
                    console.log("need new page.startindex is:"+startIndex+" endIndex is :"+endIndex);
                    fileRemainCount=fileCount;
                    startIndex=(++endIndex);
                    currentGroupNumber=needGroupDate[startIndex];
                    currentGroupCount=0;
                    index=endIndex;
                }
            }else{
                if(fileRemainCount>=currentGroupCount){
                    endIndex=index-1;
                    fileRemainCount-=currentGroupCount;
                    currentGroupNumber=item;
                    currentGroupCount=1;
                    index++;
                    if(fileRemainCount<1){
                        showHtml+="need new page.startindex is:"+startIndex+" endIndex is :"+endIndex+"\n";
                        console.log("need new page.startindex is:"+startIndex+" endIndex is :"+endIndex);
                        fileRemainCount=fileCount;
                        startIndex=(++endIndex);
                        currentGroupNumber=needGroupDate[startIndex];
                        currentGroupCount=0;
                        index=endIndex;
                    }
                }else{
                    showHtml+="need new page.startindex is:"+startIndex+" endIndex is :"+endIndex+"\n";
                    console.log("need new page.startindex is:"+startIndex+" endIndex is :"+endIndex);
                    fileRemainCount=fileCount;
                    startIndex=(++endIndex);
                    currentGroupNumber=needGroupDate[startIndex];
                    currentGroupCount=0;
                    index=endIndex;
                }
            }
        }
    }
    if(endIndex+1<needGroupDate.length && fileRemainCount>=currentGroupCount){
        endIndex=needGroupDate.length-1;
        showHtml+="need new page.startindex is:"+startIndex+" endIndex is :"+endIndex+"\n";
        console.log("need new page.startindex is:"+startIndex+" endIndex is :"+endIndex);
    }

    var oldData=document.getElementById("oldData");
    var groupDate=document.getElementById("groupIndexFlag");

    oldData.innerText=JSON.stringify(needGroupDate);
    groupDate.innerText=showHtml;
};

var testGroupDate=[1,1,2,2,2,3,3,3,4,5,5,6,6,6];
groupDataInterface(testGroupDate,6);

var testinterface=function(){
    var needData=document.getElementById("inputNumber").value;
    var count=document.getElementById("number").value;
    groupDataInterface(JSON.parse(needData),parseInt(count));
};