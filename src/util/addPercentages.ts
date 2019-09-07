/**
 * Takes in 2 percentage strings and returns their sum as a number
 * 
 * Ex: ('1%', '1%') => '2%' 
 */
export default (p1: string, p2: string): number => {
    const num1 = parseInt(p1.replace('%', ''));
    const num2 = parseInt(p2.replace('%', ''));

    return num1 + num2;
}