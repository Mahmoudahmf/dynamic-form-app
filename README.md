Dynamic Form Builder

- This Angular component dynamically generates a form from a JSON configuration file.

Features

- Dynamic Form Generation: It builds forms based on a JSON schema.

- Validation: Supports required fields, pattern matching, min/max length, and email validation.

- Local Storage Persistence: Saves form progress automatically.

- Nested Groups and Arrays: Supports complex form structures.


Installation

- Clone the repository
 
- Install dependencies

 (npm i)

- Run Angular App

 (ng serve -o)


 Usage

 - JSON Configuration (assets/form.json)
 
 Example:
 {
    "fields": [
      {
        "type": "text",
        "name": "fullName",
        "label": "Full Name",
        "required": true,
        "minLength": 3
      },
      {
        "type": "email",
        "name": "email",
        "label": "Email Address",
        "required": true
      },
      {
        "type": "password",
        "name": "password",
        "label": "Password",
        "required": true,
        "minLength": 6
      },
      {
        "type": "select",
        "name": "country",
        "label": "Country",
        "options": [
          { "label": "USA", "value": "usa" },
          { "label": "UK", "value": "uk" },
          { "label": "Germany", "value": "germany" }
        ],
        "required": true
      },
      {
        "type": "checkbox",
        "name": "subscribe",
        "label": "Subscribe to newsletter"
      },
      {
        "type": "array",
        "name": "hobbies",
        "label": "Hobbies"
      },
      {
        "type": "group",
        "name": "address",
        "label": "Address",
        "fields": [
          {
            "type": "text",
            "name": "street",
            "label": "Street",
            "required": true
          },
          {
            "type": "text",
            "name": "city",
            "label": "City",
            "required": true
          },
          {
            "type": "text",
            "name": "zipCode",
            "label": "ZIP Code",
            "required": true,
            "minLength": 5,
            "maxLength": 10
          }
        ]
      }
    ]
  }
  

