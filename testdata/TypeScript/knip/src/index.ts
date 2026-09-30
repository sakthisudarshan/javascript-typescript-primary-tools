import { activeService } from './ghost_service';

export function runMain(): string {
    return activeService();
}
