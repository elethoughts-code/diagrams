
export function ready(document: Document): Promise<void>{
    return new Promise<void>((resolve, reject) => {
        if (document.readyState !== 'loading') {
            resolve();
        } else if(document.addEventListener) {
            document.addEventListener('DOMContentLoaded', () => resolve());
        }else {
            reject('no DOM listener found');
        }
    });
}