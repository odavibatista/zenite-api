export interface SeasonProviderInterface {
    getCurrentSeason(): 'summer' | 'autumn' | 'winter' | 'spring';
}