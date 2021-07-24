import { Observable } from 'rxjs';
export function delayNode() {
    return (observable) =>
        new Observable((subscriber) => {
            const subscription = observable.subscribe({
                next(value) {
                    let proxies = value.response.proxies
                    let nodeList = []
                    for (const key in proxies) {
                        let item = proxies[key]
                        if (item.history.length > 0) {
                            if (item.history.every(node => node.delay > 0 && node.delay < 1500)) {
                                nodeList.push(item.name)
                            }
                        }
                    }
                    subscriber.next(nodeList);
                },
                error(err) {
                    subscriber.error(err);
                },
            });
            return () => {
                subscription.unsubscribe();
            };
        });
}
