**Table of Contents**

- [PipeDrive-Bling Integration](#pipedrive-bling-integration)
- [Quickstart Guide](#quickstart-guide)
- [Endpoints Definiton](#endpoints-definiton)
  * [Core Integration](#core-integration)
  * [Total Value by Day](#total-value-by-day)

# PipeDrive-Bling Integration

A simple integration between PipeDrive and Bling. It turns all the Deals registered on PipeDrive as Won into a Bling order. The service runs automatically everyday at 00:05 a.m. (America/Sao_Paulo timezone) and also register the total value of the day in a MongoDB.

There are also two endpoints available. The first one allow the user to run the core integration manually to a given date and the second endpoint returns all values registered in the database.

# Quickstart Guide

First clone this repository.

`$ git clone https://github.com/hugosanga/pipedrive-bling-integration.git`

Install all the necessary packages.

`$ npm install`

Create a file named ".env" in the root of the application, with the following variables.

	PIPEDRIVE_API_TOKEN=<pipedrive_api_token>
	BLING_API_TOKEN=<bling_api_token>
	MONGODB_URI=<mongodb_uri>
	MONGODB_USER=<mongodb_user>
	MONGODB_PASSWORD=<mongodb_password>
	MONGODB_DBNAME=<mongodb_dbname>

Then start the application in production mode.

`$ npm run start:prod`

# Endpoints Definiton
## Core Integration
![GET](https://img.shields.io/badge/METHOD-GET-green) `/integration`

All the Won Deals registered on PipeDrive at the given date will be posted on Bling as an order and the total value of the day will be registered in the MongoDB.

<h4><b>Query Parameters:</b></h4>

| Parameter   | Description |
| ------------- | ------------- |
| date (optional) `string` | Datestring on format YYYY-MM-DD. If not supplied the date will be set as today. |

## Total Value by Day
![GET](https://img.shields.io/badge/METHOD-GET-green) `/deals`


Returns all the entries registered in the MongoDB, limited to 100 results, ordered by date. Can receive a parameter to filter just the results after the supplied date.

<h4><b>Query Parameters:</b></h4>

| Parameter   | Description |
| ------------- | ------------- |
| laterThan (optional) `string` | Datestring on format YYYY-MM-DD. If not supplied it will be set as today. |
