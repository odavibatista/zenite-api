import { SeasonProviderInterface } from 'src/shared/domain/providers/Season.provider';

export class SeasonProvider implements SeasonProviderInterface {
  getCurrentSeason(): 'summer' | 'autumn' | 'winter' | 'spring' {
    const month = new Date().getMonth() + 1; // getMonth() returns 0-11

    if (month >= 3 && month <= 5) {
      return 'spring';
    } else if (month >= 6 && month <= 8) {
      return 'summer';
    } else if (month >= 9 && month <= 11) {
      return 'autumn';
    } else {
      return 'winter';
    }
  }
}
