$(document).ready(function(){
    
    
    $('form').submit(function(e){
        e.preventDefault();
        getJson();
    }); //submit end
    
    $('form').keyup(function(e){
       getJson();
    }); // keyup end
    

    function getJson(){
       var $title = $('#search').val();
       var $year = $('#year').val();
       var url = "https://www.omdbapi.com/?";
       var data = {
         s: $title,
         y: $year,
         plot: "full",
         r: "json"
       };
        $.getJSON(url,data,getMovie );
    }
    
            
    function getMovie(data){
        console.log(data);
        var html = "";
        var modalHtml = "";
        if (data.Response === "True"){
        //'<li id=' + movie.imdbID + '>';
            $.each(data.Search,function(index, movie){
                html += '<li class= "'+ movie.imdbID+'" data-toggle="modal" data-target="#'+ movie.imdbID+'">';
                html += '<div class="poster-wrap">';
                if (movie.Poster === 'N/A'){
                    html += '<a herf="#"><i class="material-icons poster-placeholder">crop_original</i></a>';
                } else {
                    html += '<a herf="#"><img class="movie-poster" src="' + movie.Poster + '"></a>';
                }
                
                html += "</div>";
                html += '<span class="movie-title">'+ movie.Title +'</span>';
                html += '<span class="movie-year">' + movie.Year + '</span>';
                html += "</li>";
                modalHtml += '<div class="modal fade" id="'+ movie.imdbID+'" role="dialog"><div class="modal-dialog"> <div class="modal-content"><div class="modal-header">';
                modalHtml += '<h4 class="modal-title">' + movie.Title+'</h4><p>' + movie.Year+'</p></div>';
                modalHtml += '<div class="modal-body"><img src="'+ movie.Poster+'">';
                modalHtml += '<p>'+ movie.Plot +'</p></div>';
                modalHtml += '<button class="btn btn-default"><a class="link-imdb" href="http://www.imdb.com/title/'+ movie.imdbID +'" target="_blank">Link to IMDB</a></button>';
                modalHtml += '<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>';

                    
                
            });
        } else {

            html += "<li class='no-movies'>";
			html += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: " + $('#search').val();
			html += "</li>";
        }
            
       $('#movies').html(html);
       $('.main-content').append(modalHtml);
       
       $('li').click(function(){
           var updateModal = "";
            $.ajax({
                url: "https://www.omdbapi.com/?",
                data: {
                    i: $(this).attr('class'),
                    plot: "full",
                    r: "json"
                },
                success: function(data){
                    if (data.Response === "True"){
                         updateModal += '<div class="modal-dialog"> <div class="modal-content"><div class="modal-header">';
                         updateModal += '<h4 class="modal-title">' + data.Title+'</h4><p>' + data.Year+'</p></div>';
                         updateModal += '<div class="modal-body"><img src="'+ data.Poster+'">';
                         updateModal += '<p>'+ data.Plot +'</p></div>';
                         updateModal += '<button class="btn btn-default"><a class="link-imdb" href="http://www.imdb.com/title/'+ data.imdbID +'" target="_blank">Link to IMDB</a></button>';
                         updateModal += '<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="data">Close</button></div></div></div></div>';

                    }
                    
                    $('#'+ data.imdbID ).html(updateModal);
                }
                
                
            });
       }); //click end
        
    } //getMovie end
           
    
             
    
}); // end ready