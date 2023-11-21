'use strict';

const isValidDate = (dateString) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  return regex.test(dateString);
};

class BirthdayChecker {
  constructor() {
      this.init();
  }

  init() {
      this.createInput();
      this.createButton();
  }

  createInput() {
      this.input = document.getElementById('birthdayInput');
      this.resultContainer = document.getElementById('resultContainer');
  }

  createButton() {
      const button = document.getElementById('checkButton');
      button.addEventListener('click', this.handleButtonClick.bind(this));
  }

  handleButtonClick() {
      const inputValue = this.input.value;
      const resultContainer = this.resultContainer;

      if (inputValue.trim() !== '' && isValidDate(inputValue)) {
          const birthDate = this.parseDate(inputValue);
          const today = new Date();

          const age = today.getFullYear() - birthDate.getFullYear();
          const nextBirthdayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

          if (nextBirthdayThisYear < today) {
              nextBirthdayThisYear.setFullYear(today.getFullYear() + 1);
          }

          const daysUntilBirthday = Math.ceil((nextBirthdayThisYear - today) / (1000 * 60 * 60 * 24));

          if (
              birthDate.getDate() === today.getDate() &&
              birthDate.getMonth() === today.getMonth()
          ) {
              // It's the user's birthday
              resultContainer.innerHTML = `
                  <p>Happy Birthday! 🎉 Today is your birthday!</p>
                  <p>You were born on: ${birthDate.toDateString()}</p>
                  <p>You are ${age} years old.</p>
                  <p>You are ${this.daysOld(birthDate)} days old.</p>
              `;
          } else {
              // It's not the user's birthday
              if (daysUntilBirthday === 1) {
                  resultContainer.innerHTML = `
                      <p>You were born on: ${birthDate.toDateString()}</p>
                      <p>You are ${age} years old.</p>
                      <p>You are ${this.daysOld(birthDate)} days old.</p>
                      <p>There is 1 day until your next birthday.</p>
                  `;
              } else {
                  resultContainer.innerHTML = `
                      <p>You were born on: ${birthDate.toDateString()}</p>
                      <p>You are ${age} years old.</p>
                      <p>You are ${this.daysOld(birthDate)} days old.</p>
                      <p>There are ${daysUntilBirthday} days until your next birthday.</p>
                  `;
              }
          }

          // Show the result container
          resultContainer.style.display = 'block';
      } else {
          resultContainer.innerHTML = '<p>Please enter a valid date (dd-mm-yyyy).</p>';
          // Hide the result container
          resultContainer.style.display = 'none';
      }
  }

  parseDate(dateString) {
      const [day, month, year] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
  }

  daysOld(birthDate) {
      const today = new Date();
      const millisecondsInADay = 24 * 60 * 60 * 1000;
      return Math.round(Math.abs((today - birthDate) / millisecondsInADay));
  }
}

const birthdayChecker = new BirthdayChecker();
