# Finance

This will be a app for handling finance and budgeting

## Entities

### Transaction

A transaction will be the main entity that defines the system. Everything will be around transactions and how they interact with eachother and what other entities they need.

A transaction is defined by:
* An ID (UUID)
* A description
* A date
* A value (always positive; direction is determined by payer/payee)
* A category
* Many tags
* Payer (account from which the money came)
* Payee (account to which the money went)
* A parent transaction (optional; see Currency Exchange)

### Account

An account is defined by:
* A name
* A currency
* A type (asset, liability, or tracking)

Transactions will be associated with accounts. With this we are able to verify balance and transactions for each account.

Accounts are flexible enough to model many financial concepts:
* **Checking/savings** (asset) - regular bank accounts
* **Credit cards** (liability) - balance goes negative with purchases, returns to 0 when the bill is paid
* **Investments** (tracking) - track how much money was put into an apartment, stocks, etc.
* **Fee sinks** (liability) - destination accounts for fees (e.g., bank fees, government taxes)

### Category

A category is an exclusive classification for transactions. A transaction can only have one category, but a category can be associated with many transactions.

A category can also have subcategories, for example:

->Leisure
--> Cinema
--> Sports
--> Arcade
->Health
--> Medicine
--> Dental
--> Appointments

When we check for the amount spent on categories that doesn't overlap with the subcategories, it should be a 0-sum situation.

This is useful when we have categories for a specific purpose, and when we don't we use the parent category. We can have subcategories infinitely, without restriction. The user can be as specific as it likes

-> Leisure
--> Cinema
---> Tickets
---> Food
----> Popcorn
----> Soda
----> Water

It's left for user discretion.

### Tags

Tags are a non-exclusive classification method. An item can have many tags, and tags don't sum up. The usefulness of a tag is to cluster transactions in a non-hierarchical way. For example, we can have "Leisure" as tags when we want to keep track things that are done for leisure but actually fall on other categories for budgeting.

Tags are defined only by a name.

### Currency

A currency is defined by:
* A code (eg.: BRL, USD, BTC)
* A name (eg.: Real/Reais, Dollar/Dollars, Bitcoin)
* A symbol (eg.: R$, $)
* Decimal parts (1, 2, 3)

The currency defines how a monetary amount is presented. A transaction will hold only an integer number, and the currency is what defines how it is displayed.

#### Conversion

Currencies can be converted in two different situations: trade and displaying.

When we are displaying a BRL value in USD, for example, there are no fees: we just have the market value being displayed differently. This is exceptionally useful for smaller fractions, as for example displaying a very small amount of bitcoin in satoshis.

#### Currency Exchange

A currency exchange is a special kind of transaction that moves money between accounts of different currencies. It is composed of:

* A **source transaction**: value in the payer's currency, debited from the source account
* A **destination transaction**: value in the payee's currency, credited to the destination account
* Zero or more **fee transactions**: each fee is itself a transaction with its own payer and payee (e.g., one fee to a banking fintech account, another to a government tax account). Fee transactions reference the source transaction as their parent.

When viewing an account's transaction list, the transaction is displayed in that account's currency. The full exchange details (both amounts, exchange rate, and associated fees) are accessible from the transaction.

Example: Converting USD to BRL via a fintech
* Source transaction: $100 from "Global Account" (USD)
* Destination transaction: R$500 to "Banco do Brasil" (BRL)
* Fee transaction 1: $2 from "Global Account" to "Fintech Fees" (banking fee)
* Fee transaction 2: R$5 from "Banco do Brasil" to "IOF Tax" (government tax)

## Technology

* **Electron** - desktop application
* **React + Mantine** - UI framework; use Mantine's built-in components exclusively, no custom components. Desktop-style UX focus.
* **Zustand** - state management, with localStorage persistence for all data
* **Vite** - build tool and dev server
* **TypeScript**
* **Dark mode support** - using Mantine's built-in color scheme management

Data is stored entirely in localStorage for the MVP. The architecture should keep data access behind a store layer so that swapping localStorage for an API backend later is straightforward.

## Future Enhancements

* **API + backend** - replace localStorage with a proper backend

* **Recurring transactions** - templates for rent, subscriptions, salaries, etc.
* **Budgets** - spending limits per category per period
