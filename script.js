const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById('movie');

populateUI();


 // + sign is to convert string into number
let ticketprice = +movieSelect.value;


// Save Selected MOVIE index and ticketprice
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}



// Update total and count
function updateSelectedCount()
{
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // copy selected seats into array
  // Map through array
  // return a new array indexes

  // We use SPREAD OPERATOR '...'
  const seatsIndex = [...selectedSeats].map(function(seat) {
    return [...seats].indexOf(seat)
  });

  // local Storage save
  localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

  const selectedCount = selectedSeats.length;

  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketprice;
}


// movie select event
movieSelect.addEventListener('change', function(event){
  ticketprice = +event.target.value;

  setMovieData(event.target.selectedIndex, event.target.value);

  updateSelectedCount();
});



// Seat click event
container.addEventListener('click', function(event){
  if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
    event.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Get data from local storage and populate UI
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats !== null && selectedSeats.length>0){
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index)> -1){
        seat.classList.add('selected');
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}


// Initial Count and total set
updateSelectedCount();
