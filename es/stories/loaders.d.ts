export function monoLoader(singleValue: any): ({ timeDomain, oldSeries, reason, }: {
    timeDomain: any;
    oldSeries: any;
    reason: any;
}) => {
    data: any;
};
export function staticLoader({ id, timeDomain, n, multiplier, oldSeries, reason, }: {
    id: any;
    timeDomain: any;
    n?: number;
    multiplier?: number;
    oldSeries: any;
    reason: any;
}): any;
export function liveLoader({ oldSeries, timeDomain, reason }: {
    oldSeries: any;
    timeDomain: any;
    reason: any;
}): any;
export function customAccessorLoader({ timeDomain, oldSeries, reason }: {
    timeDomain: any;
    oldSeries: any;
    reason: any;
}): {
    data: any;
};
export function functionLoader(func: any): ({ timeSubDomain, pointsPerSeries }: {
    timeSubDomain: any;
    pointsPerSeries: any;
}) => {
    data: {
        timestamp: any;
        value: any;
    }[];
};
