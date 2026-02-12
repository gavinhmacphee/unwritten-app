const prompts = [
  "What made you smile about {name} today?",
  "What new thing did {name} try today?",
  "What did {name} say that surprised you?",
  "Describe {name} in this exact moment.",
  "What was {name}'s favorite part of today?",
  "What small moment with {name} do you want to remember?",
  "How did {name} make someone laugh today?",
  "What is {name} obsessed with right now?",
  "What did {name} eat today that was funny or memorable?",
  "What song or show is {name} into this week?",
  "How did {name} show kindness today?",
  "What new word or phrase is {name} using?",
  "What was bedtime like with {name} tonight?",
  "What did {name} do independently today?",
  "Describe {name}'s mood today in one sentence.",
  "What game or activity did {name} invent today?",
  "What question did {name} ask today?",
  "What was the hardest part of today with {name}?",
  "What would {name} say was the best part of today?",
  "How has {name} changed from last month?",
  "What silly thing did {name} do today?",
  "What does {name}'s laugh sound like right now?",
  "What comfort object is {name} attached to?",
  "Who did {name} play with today?",
  "What milestone is {name} close to reaching?",
  "What was {name} wearing today that was cute?",
  "What did {name} refuse to do today?",
  "How did {name} wake up this morning?",
  "What story does {name} want to hear over and over?",
  "What face does {name} make when they're happy?",
  "What did you and {name} do together today?",
]

export function getDailyPrompt(childName, date = new Date()) {
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  )
  const index = dayOfYear % prompts.length
  return prompts[index].replace('{name}', childName)
}

export function getRandomPrompt(childName) {
  const index = Math.floor(Math.random() * prompts.length)
  return prompts[index].replace('{name}', childName)
}
