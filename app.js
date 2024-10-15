let habits = []

document.getElementById('addHabit').addEventListener('click', addHabit)

document.getElementById('filter').addEventListener('change', filterHabit)

document.getElementById('sort').addEventListener('click', sortHabit)

function addHabit() {
  console.log('habit')
  let input = document.getElementById('inputHabit').value

  if (input) {
    habits.push({ habit: input, completed: true })
    document.getElementById('inputHabit').value = ''
    console.log(habits)
    displayHabits()
  } else {
    alert('enter a habit')
  }

  saveHabit()
}

function displayHabits() {
  let habitList = document.getElementById('habitList')
  console.log(habitList)
  habitList.innerHTML = '' // Clear the current list
  habits.forEach((habit, index) => {
    const habitItem = document.createElement('div')
    habitItem.textContent = habit.habit
    habitItem.style.textDecoration = habit.completed ? 'line-through' : 'none'
    habitItem.addEventListener('click', () => {
      habit.completed = !habit.completed // Toggle completion
      displayHabits() // Update display
    })
    habitList.appendChild(habitItem)
  })
}

function filterHabit() {
  const filterValue = document.getElementById('filter').value
  let filteredHabits = []

  if (filterValue === 'completed') {
    filteredHabits = habits.filter((habit) => habit.completed)
  } else if (filterValue === 'active') {
    filteredHabits = habits.filter((habit) => !habit.completed)
  } else {
    filteredHabits = habits // Show all if no filter is applied
  }

  displayFilteredHabits(filteredHabits)
}

function displayFilteredHabits(filteredHabits) {
  const habitList = document.getElementById('habitList')
  habitList.innerHTML = ''

  filteredHabits.forEach((habit, index) => {
    const habitItem = document.createElement('div')
    habitItem.textContent = habit.habit
    habitItem.style.textDecoration = habit.completed ? 'line-through' : 'none'

    habitItem.addEventListener('click', () => {
      habit.completed = !habit.completed
      displayFilteredHabits(filteredHabits) // Update filtered view
    })

    habitList.appendChild(habitItem)
  })
}

function sortHabit() {
  habits.sort((a, b) => {
    // Ensure both a.name and b.name are defined
    if (a.name && b.name) {
      return a.name.localeCompare(b.name)
    }
    // Handle cases where a.name or b.name is undefined
    return a.name ? 1 : -1 // Push undefined values to the end
  })
  displayHabits()
}

function saveHabit() {
  localStorage.setItem('habits', JSON.stringify(habits))
}

function loadHabit() {
  let storedHabit = JSON.parse(localStorage.getItem('habits') || [])
  habits = storedHabit
  displayHabits()
}

loadHabit()

function clearHabits() {
  habits = []
  saveHabit()
  displayHabits()
}

// Add this to your HTML:
// <button id="clearHabits">Clear Habits</button>

document.getElementById('clearHabits').addEventListener('click', clearHabits)
