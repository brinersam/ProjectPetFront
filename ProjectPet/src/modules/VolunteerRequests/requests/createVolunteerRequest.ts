import type { PaymentInfo } from "../Models/paymentInfo"

export type CreateVolunteerRequest = {
    accountDto : AccountDto
}

export type AccountDto = {
    paymentInfos : PaymentInfo[],
    experience : number,
    certifications : string[]
}