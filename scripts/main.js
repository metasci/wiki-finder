
var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
var title;
var callback = '&callback=?';
var webPage = 'https://en.wikipedia.org/?curid=';

var $random = $('.random');
var $barBorder = $('.bar');
var $mag = $('.mag');
var $input = $('input');
var $glass = $('.glass');
var $clearable = $('.clearable');
var $clear = $('.clear');
var $remove = $('.glyphicon-remove');
var $search = $('.glyphicon-search');
var $instruct = $('.instruct');
var $searchButton = $('.instruct a');
var $results = $('.results');


$input.on('focusin', function() {
    $barBorder.css('border-color', 'white');
    $input.css('color', 'white');
    $searchButton.css({
        'color': 'white'
    });
});

$input.on('focusout', function() {
    $barBorder.css({
        'border-color': 'gray'
    });
    $input.css({
        'color': 'gray'
    });
    $searchButton.css({
        'color': 'gray'
    });
});

$input.on('keydown', function() {
   $input.trigger('focusin'); 
});



function changeUp() {
    $mag.toggleClass('hide');
    $input.toggleClass('hide');
    $clearable.toggleClass('hide');
    $barBorder.toggleClass('hide');
}

function glassIn() {
    $glass.fadeIn(100, function() {
        $mag.addClass('clickable');
    });
}



$mag.on('click', function() {
    if ($mag.hasClass('clickable')) {
            $mag.removeClass('clickable');
            $glass.fadeOut(100, function() {
                $mag.animate({width: '520px'}, 500).animate({width: '450px'}, 200, changeUp);
                $instruct.html('Press enter to submit');
        });
    }
});


//when i click clear, the website seems to glitch and get confused... why?

$clear.on('click', closeUp); 

function closeUp() {
    $input.val('');
    $results.html('');
    $random.animate({margin: '10% 0 3% 0'}, 500);
    $instruct.removeClass('hide');
    changeUp();
    $mag.animate({width: '520px'}, 200).animate({width: '50px'}, 500, glassIn);
    $instruct.html('Click icon to search');
    
}

///////////////////////////////////////////////


function findArticle() {
    $.ajax({
        type: 'GET',
        url: api + title + callback,
        dataType: 'jsonp',
        success: function(info) {
            
            
            $results.html('');
            
            $random.animate({margin: '2% 0 3% 0'}, 500, function() {
               $instruct.addClass('hide'); 
            });
            
            
            
                $.each(info.query.pages, function(i, item) {
                            $results.append('<a target="_blank" href="'+webPage+item.pageid+'"><h3>'+item.title+'</h3>'+'<p>'+ item.extract +'</p>'+'</a>');
                        });
            // 
            
               
               $results.animate({opacity: '1'}, 500, function(){
                   console.log('yes');
               }); 
            
               
    
            
            
            
            


        },
        error: function() {
            alert('error');
        }
    });
}


$('form').submit(function() {
    $input.trigger('focusout');
    title = $input.val();
    
        $results.animate({opacity: '0'}, 200, function(){
                findArticle();
        });
  
    
    return false; //prevents page reload on submit
});

