'use strict';

class BirthdayChecker {
    constructor() {
      this.init();
    }
  
    init() {
      this.createInput();
      this.createButton();
    }
  
    createInput() {
      const label = document.querySelector('label');
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
  
      if (this.isValidDate(inputValue)) {
        const birthDate = this.parseDate(inputValue);
        const today = new Date();
  
        const age = today.getFullYear() - birthDate.getFullYear();
        const nextBirthdayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  

        if (nextBirthdayThisYear < today) {
          nextBirthdayThisYear.setFullYear(today.getFullYear() + 1);
        }
  
        const daysUntilBirthday = Math.ceil((nextBirthdayThisYear - today) / (1000 * 60 * 60 * 24));
  
        resultContainer.innerHTML = `
          <p>You were born on: ${birthDate.toDateString()}</p>
          <p>You are ${age} years old.</p>
          <p>You are ${this.daysOld(birthDate)} days old.</p>
          <p>There are ${daysUntilBirthday} days until your next birthday.</p>
        `;
      } else {
        resultContainer.innerHTML = '<p>Please enter a valid date (dd-mm-yyyy).</p>';
      }
    }
  
    isValidDate(dateString) {
      const regex = /^\d{2}-\d{2}-\d{4}$/;
      return regex.test(dateString);
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
  