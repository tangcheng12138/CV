var optionSelect=document.getElementById('option');
var pointOne=document.getElementById('point1');
var pointTwo=document.getElementById('point2');
var pointThree=document.getElementById('point3');

pointOne.onclick=function () {
    optionSelect.className= 'optionSelect1';
};

pointTwo.onclick=function () {
    optionSelect.className= 'optionSelect2';
};

pointThree.onclick=function () {
    optionSelect.className= 'optionSelect3';
};

window.onscroll=function (x) {
    if(window.scrollY>0){
        topNavBar.classList.add('topAnimation');
    }else {
        topNavBar.classList.remove('topAnimation');
    }

    var data=document.querySelectorAll('[data-x]');
    var min=0;
    for(var i=1;i<data.length;i++){
        if(Math.abs(data[i].offsetTop-window.scrollY)<Math.abs(data[min].offsetTop-window.scrollY)){
            min=i;
        }
    }
    for(var i=0;i<data.length;i++){
        data[i].classList.remove('active');
    }
    data[min].classList.add('active');
    var id=data[min].getAttribute('id');
    var a=document.querySelector('a[href="#'+id+'"]');
    var li=a.parentNode;
    var brother=li.parentNode.children;
    for(var i=0;i<brother.length;i++){
        brother[i].classList.remove('active');
    }
    li.classList.add('active');
};

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

var list=document.getElementById('topList');
var aLists=list.getElementsByTagName('a');
for (var i=0;i<aLists.length;i++) {
    aLists[i].onclick=function (x) {
        x.preventDefault();
        var target=x.currentTarget;
        var targetHref=target.getAttribute('href');
        var element=document.querySelector(targetHref);
        var startTop=window.scrollY;
        var targetTop=element.offsetTop-70;
        const coords = { y : startTop };
        const tween = new TWEEN.Tween(coords)
            .to({ y : targetTop}, 1000)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function () {
                window.scrollTo(0, coords.y)
            })
            .start();
    }
}

var buttonPre=document.getElementById('buttonPre');
var buttonAfter=document.getElementById('buttonAfter');
var rotationList=document.getElementsByClassName('rotationList');
var points=document.getElementsByClassName('point')
var index=0;
var time=0;

buttonAfter.addEventListener('click',function () {
    time=0;
    index++;
    if(index>4){
        index=0
    }
    showIndex();
});

buttonPre.addEventListener('click',function () {
    time=0;
    index--;
    if(index<0){
        index=4
    }
    showIndex();
})

function showIndex() {
    clearIndex();
    rotationList[index].classList.add('active');
    points[index].classList.add('active');
}

function clearIndex() {
    for(var i=0;i<rotationList.length;i++){
        rotationList[i].classList.remove('active');
        points[i].classList.remove('active');
    }
}

setInterval(function () {
    time++;
    if(time===20){
        time=0
        index++;
    if(index>4){
        index=0
    }
    showIndex();
    }
},100);

AV.init({
    appId: "hXU73OkCf9YVnAlOmBKQNNdC-gzGzoHsz",
    appKey: "2xgDUWpisc0b5V7TjUeSkwHL",
    serverURL: "https://hxu73okc.lc-cn-n1-shared.com"
});


const query = new AV.Query('message');
var messageList=document.getElementById('messageLists');
query.find().then(function (messages) {
    for(var i=0;i<messages.length;i++){
        var words=messages[i].attributes.words;
        var names=messages[i].attributes.name;
        var li=document.createElement('li');
        li.innerHTML=names+':'+words;
        messageList.appendChild(li);
    }
},function (error) {

});

var postMessage=document.getElementById('postMessage');
postMessage.addEventListener('submit',function (e) {
    e.preventDefault();
    var content=postMessage.querySelector('input[name=content]').value;
    var name=postMessage.querySelector('input[name=name]').value;
    const TestObject = AV.Object.extend('message');
    const testObject = new TestObject();
    testObject.set('words',content);
    testObject.set('name',name);
    testObject.save().then((testObject) => {
        var li=document.createElement('li');
        li.innerHTML=name+': '+content;
        messageList.appendChild(li);
        postMessage.querySelector('input[name=content]').value='';
        postMessage.querySelector('input[name=name]').value='';
    })

});

