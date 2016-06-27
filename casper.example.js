//First install phantomjs, then sudo npm install -g casperjs

//initialize casper, verbose mode so we can see what's wrong when error happens
var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug'
});

//Specify the website you want to visit
casper.start('http://xx.xxx.xxx.xx/login.php');

//Get the title of login.php page
casper.then(function() {
    this.echo(this.getTitle());
})

//find username and password input field put in name and submit the form
//must use evaluate when using querySelector
casper.thenEvaluate(function() {
    document.querySelector('input[name="username"]').setAttribute('value', 'xxx');
    document.querySelector('input[name="password"]').setAttribute('value', 'xxx');
    document.querySelector('form').submit();
});

//wait for id=login to disapear
casper.waitWhileSelector('#login', function() {
    this.echo("logeed in")
}, 'failed')

//get the current Url when logged in
casper.then(function() {
    this.echo("I am in now");
    this.echo(this.getCurrentUrl());
});

//click torrent tab
casper.then(function() {
    this.click('a[href="xxx.php"]')
})

//wait for the url to jump to torrent.php
casper.waitForUrl(/xxx\.php$/, function() {
    this.echo(this.getCurrentUrl());
})

//evalute all satisfied items 
casper.then(function() {
    console.log("links start")
    var links = this.evaluate(getLinks)
    console.log("links end")
    console.log(links.length)
    // console.log(links)
    links.forEach(function(ele) {
    	console.log(ele)
    })
})

//select all torrents, select their title and display. because we are using 
//Array.prototype.map.cal, since querySelectorAll returns nodeList
//so neet to change it
function getLinks() {
    var links = document.querySelectorAll('table.xxx td.xxx');
    return Array.prototype.map.call(links, function(e) {
        console.log(e.innerHTML)
        return e.outerText + '\n';
    });
}

//run the whole process.
casper.run();
