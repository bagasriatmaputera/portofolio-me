export interface Environment {
    contactMail: string;
    web3FormsAccessKey: string;
    web3FormsApiUrl: string;
}

export const environment: Environment = {
    contactMail: "[EMAIL_ADDRESS]",
    web3FormsAccessKey: "c5db327e-e270-4ab0-b84f-83bcd20565b8",
    web3FormsApiUrl: "https://api.web3forms.com/submit",
};

export default environment;