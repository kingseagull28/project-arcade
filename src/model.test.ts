import {describe,it,expect} from 'vitest';
import {projects,filterProjects,publicSchema,validateCatalog,safeUrl,continuation} from './model';
describe('catalog',()=>{
 it('has unique ids and slugs',()=>{expect(new Set(projects.map(p=>p.id)).size).toBe(projects.length);expect(new Set(projects.map(p=>p.slug)).size).toBe(projects.length)});
 it('searches case insensitively and trims',()=>{expect(filterProjects(projects,'  PIRATE  ')).toHaveLength(1);expect(filterProjects(projects,'no such project')).toHaveLength(0)});
 it('combines category with query',()=>{expect(filterProjects(projects,'pirate','Racing')).toHaveLength(0);expect(filterProjects(projects,'','Racing')).toHaveLength(1)});
 it('rejects dangerous URLs',()=>{for(const x of ['javascript:alert(1)','http://example.com','https://user:pass@example.com'])expect(safeUrl.safeParse(x).success).toBe(false)});
 it('rejects private fields and missing approval',()=>{const row={id:'demo',slug:'demo',title:'Demo',description:'Demo',longDescription:'Demo',category:'Game',tags:[],cover:'/cover.svg',screenshots:[],playUrl:'https://example.com',instructions:'Play',featured:false,approved:true};expect(publicSchema.safeParse(row).success).toBe(true);for(const key of ['notes','repositoryUrl','aiContext','previewUrl','knownBugs','originalPrompt'])expect(publicSchema.safeParse({...row,[key]:'PRIVATE'}).success).toBe(false);expect(publicSchema.safeParse({...row,approved:false}).success).toBe(false);expect(()=>validateCatalog(publicSchema,[row,row])).toThrow()});
});
