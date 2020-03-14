import { Task } from '../api';

export function getCategoryName(category: string) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

export function calculateCategoryAverage(tasks: Task[], category: string) {
    if (tasks && tasks.length > 0) {
        const categoryFields = tasks.filter(filtered => filtered.category === category);
        const categoryScores = categoryFields.map(fields => fields.score);
        return categoryScores.reduce((total, value) => total + value, 0) / categoryScores.length;
    }
    return 0;
}