import React from 'react';
import DataContext from '../../context/Data';
import { Domains } from '../../utils/Axes';
import { Domain, Series, Collection } from '../../external';
type OnTimeSubDomainChanged = (timeSubDomain: Domain) => void;
type LimitTimeSubDomain = (timeSubDomain: Domain) => Domain;
type OnUpdateDomains = (subDomains: DomainsByItemId) => void;
interface DataContext {
    timeDomain: Domain;
    timeSubDomain: Domain;
    timeSubDomainChanged: OnTimeSubDomainChanged;
    limitTimeSubDomain: LimitTimeSubDomain | undefined;
    externalXSubDomain: Domain | undefined;
    series: Series[];
    collections: Collection[];
    onUpdateDomains: OnUpdateDomains;
}
export interface Props {
    children: React.ReactNode;
    dataContext: DataContext;
}
export interface DomainsByItemId {
    [itemId: string]: Domains;
}
export interface OnDomainsUpdated extends Function {
}
/**
 * Provide a placeholder domain so that we can test for validity later, but
 * it can be safely operated on like a real domain.
 */
export declare const placeholder: (min: number, max: number) => Domain;
export declare const firstResolvedDomain: (domain: Domain | undefined, ...domains: (undefined | Domain)[]) => Domain | undefined;
declare const _default: (props: Props) => import("react/jsx-runtime").JSX.Element;
export default _default;
