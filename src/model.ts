import {z} from 'zod';
import data from './catalog.json';
const text=z.string().min(1);
const local=z.string().regex(/^\/(?!\/)[A-Za-z0-9/_ .-]+$/);
export const safeUrl=z.string().refine(v=>{try{const u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password}catch{return false}},'Use an absolute HTTPS URL');
const launch=z.union([safeUrl,local]);
const base={id:text,slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),title:text,description:text,longDescription:text,category:text,tags:z.array(text),cover:local,screenshots:z.array(local)};
export const publicSchema=z.object({...base,playUrl:launch,instructions:text,featured:z.boolean(),approved:z.literal(true)}).strict();
export function validateCatalog<T extends {id:string;slug:string}>(schema:z.ZodType<T>,input:unknown):T[]{const rows=z.array(schema).parse(input);for(const key of ['id','slug'] as const)if(new Set(rows.map(p=>p[key])).size!==rows.length)throw Error('Duplicate '+key);return rows}
export type PublicProject=z.infer<typeof publicSchema>;
export interface PrivateProject extends Omit<PublicProject,'playUrl'|'instructions'|'featured'|'approved'> {status:string;visibility:string;arcadePublished:boolean;repositoryUrl:string;productionUrl:string;previewUrl:string;technologies:string[];createdAt:string;updatedAt:string;version:string;originalPrompt:string;aiContext:string;notes:string;knownBugs:string[];nextTasks:string[];history:{version:string;date:string;notes:string}[]}
export type Project=PublicProject|PrivateProject;
export function filterProjects<T extends Project>(rows:T[],query='',category='All',status='All',visibility='All'):T[]{const q=query.trim().toLowerCase();return rows.filter(p=>(category==='All'||p.category===category)&&(status==='All'||('status'in p&&p.status===status))&&(visibility==='All'||('visibility'in p&&p.visibility===visibility))&&[p.title,p.description,p.longDescription,...p.tags].join(' ').toLowerCase().includes(q))}
export function continuation(_p:PrivateProject,_request=''){return ''}
export const projects=validateCatalog(publicSchema,data);