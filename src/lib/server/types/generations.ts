export type GenerationsStatus = 
| 'generating'
| 'finish'
| 'failed'

export interface Generations {
    project_id: string;
    prompt: string;
    recommendation_json: Record<string, unknown> | null;
    generated_image_url: string;
    status: GenerationsStatus;
}