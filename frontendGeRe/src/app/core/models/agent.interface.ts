export interface Agent {
    id: number;
    nom: string;
    prenom: string;
    competence: string;
    actif?: boolean;
    nombreReclamations?: number;
}
