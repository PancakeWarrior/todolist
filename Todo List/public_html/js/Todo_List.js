$(function () {
     var APPLICATION_ID = "CFB392F9-C9EE-EDE6-FF13-DBDE9A6D3200",
         SECRET_KEY = "357AB610-BB9F-7786-FF85-E14D4FF57400",
         VERSION = "v1";
         
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    
    var dataStore = Backendless.Persistence.of(Posts);
    var post = new Post({title: "My first Blog Post", content: "My first blog post content", email: "email@email.com"});
    
});

function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}

/*var postsCollection = Backendless.Persistence.of(Posts).find();
    
    console.log(postsCollection);
    
    var wrapper = {
        posts: postsCollection.data
    };
    
    Handlebars.registerHelper('format', function (time){
        return moment(time).format("dddd, MMMM Do YYYY");
    });
    
    var blogScript = $("#blog-template").html();
    var blogTemplate = Handlebars.compile(blogScript);
    var blogHTML = blogTemplate(wrapper);
    
    $('.main-container').html(blogHTML);
    */