$(function () {
    var APPLICATION_ID = "CFB392F9-C9EE-EDE6-FF13-DBDE9A6D3200",
        SECRET_KEY = "357AB610-BB9F-7786-FF85-E14D4FF57400",
        VERSION = "v1";
    
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    
    Backendless.UserService.logout();
    
    if(Backendless.UserService.isValidLogin()){
        userLoggedIn(Backendless.LocalCache.get("current-user-id"));
    } else {
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);
    }
    
    $(document).on('submit', '.form-signin',function(event) {
        event.preventDefault();
        console.log("login button clicked");
        var data = $(this).serializeArray(),
            email = data[0].value,
            password = data[1].value;
            
        Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, gotError));
    });
    
    $(document).on('click','.add-blog', function(){
          var addBlogScript = $("#add-blog-template").html();
          var addBlogTemplate = Handlebars.compile(addBlogScript);
          
          $('.main-container').html(addBlogTemplate);
    });
    $(document).on('submit', '.form-add-blog', function(){
        event.preventDefault();
        
        var data = S(this).serializeArray(),
            title = data[0].value,
            content = data[1].value;
            if ( content === "" || title === "") {
                Materialize.toast('Empty?! Fill er up!', 4000);
            }
            else{
                
                var dataStore = Backendless.Persistence.of(Posts);
                
                var postObject = new posts({
                    title: "title",
                    content: "content",
                    authorEmail: Backendless.UserService.getCurrentUser().email
                });
                
                Materialize.toast('Posted', 4000);
                dataStore.save(postObject);
                
                this.title.value = "";
                this.content.value = "";
                
            }
    });
    
    $(document).on('click', '.login', function (){
        Backendless.UserService.logout(new Backendless.Async(userLoggedOut, gotError));
        
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        
        $('.main-container').html(loginTemplate);
    });
});

function Posts(args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}

function userLoggedIn(user) {
    console.log("user sucessfully logged in");
}
function gotError(error) {
    console.log("Error message -" + error.message);
    console.log("Error code -" + error.code);
    Materialize.toast('Incorrect Loggin', 4000);
}