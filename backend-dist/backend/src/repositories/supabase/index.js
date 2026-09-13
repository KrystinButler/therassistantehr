"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSupabaseRepositories = createSupabaseRepositories;
const client_1 = require("./client");
const alert_repository_1 = require("./alert-repository");
const claim_repository_1 = require("./claim-repository");
const client_repository_1 = require("./client-repository");
const encounter_repository_1 = require("./encounter-repository");
const insurance_repository_1 = require("./insurance-repository");
const payment_repository_1 = require("./payment-repository");
const schedule_repository_1 = require("./schedule-repository");
const ticket_repository_1 = require("./ticket-repository");
const workqueue_repository_1 = require("./workqueue-repository");
function createSupabaseRepositories() {
    const db = (0, client_1.createSupabaseServiceClient)();
    return {
        scheduleRepository: (0, schedule_repository_1.createSupabaseScheduleRepository)(db),
        encounterRepository: (0, encounter_repository_1.createSupabaseEncounterRepository)(db),
        clientRepository: (0, client_repository_1.createSupabaseClientRepository)(db),
        insuranceRepository: (0, insurance_repository_1.createSupabaseInsuranceRepository)(db),
        claimRepository: (0, claim_repository_1.createSupabaseClaimRepository)(db),
        workqueueRepository: (0, workqueue_repository_1.createSupabaseWorkqueueRepository)(db),
        alertRepository: (0, alert_repository_1.createSupabaseAlertRepository)(db),
        ticketRepository: (0, ticket_repository_1.createSupabaseTicketRepository)(db),
        paymentRepository: (0, payment_repository_1.createSupabasePaymentRepository)(db),
    };
}
