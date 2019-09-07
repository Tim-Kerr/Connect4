/**
 * Takes in a percent string and returns its numeric value.
 * 
 * Ex: '2%' => 2
 */
export default (percent: string): number => parseInt(percent.replace('%', ''));