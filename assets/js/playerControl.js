let speed_player = 5;
let player_y = 0;
let player_x = 0;

act_btn.addEventListener('click',function (){

        player_div.style.left = '0px'
        player_div.style.zIndex = '1';
        player_div.style.bottom = '0px'
        player_div.style.position = "absolute"
        player_div.style.width = '100px'
        player_div.style.height = '100px'

        player_div.className = "player";

        console.log(player_x)
        $("#game .elements").append(player_div);

    }
)
        document.addEventListener('keydown', function (event) {
                if (event.key === 'd') {
                        player_x += speed_player;
                }
                if (event.key === 'a') {
                        player_x -= speed_player;
                }
                player_div.style.left = player_x + 'px';
                player_div.style.bottom = player_y + 'px';
        });
