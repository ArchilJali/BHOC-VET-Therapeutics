import {execFileSync} from 'node:child_process';

// Count visitor-facing source revisions, excluding generated mirrors.
const sourcePaths=['content','src','assets','scripts/build.mjs','scripts/publication-metadata.mjs',
  ':(exclude)assets/css',':(exclude)assets/favicon.svg',
  ':(exclude)assets/bhoc-veterinary-organization-logo.svg'];

export function applyPublicationMetadata(site,root){
  const automatic=site.publication.automatic;
  if(!automatic)return;
  const git=args=>execFileSync('git',args,{cwd:root,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
  try{git(['rev-parse','--git-dir']);}catch{return;}
  git(['merge-base','--is-ancestor',automatic.baseCommit,'HEAD']);
  const revisions=git(['log','--first-parent','--format=%H%x09%cI',`${automatic.baseCommit}..HEAD`,'--',...sourcePaths]).split('\n').filter(Boolean);
  const pending=Boolean(git(['status','--porcelain','--untracked-files=normal','--',...sourcePaths]));
  const date=revisions.length
    ?new Intl.DateTimeFormat('en-CA',{timeZone:automatic.timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(revisions[0].split('\t')[1]))
    :automatic.baseDate;
  const lastUpdated=pending?site.publication.lastUpdated:date;
  site.publication.updates=automatic.baseUpdates+revisions.length+(pending?1:0);
  site.publication.lastUpdated=lastUpdated;
  site.publication.version=lastUpdated.slice(2).replaceAll('-','.');
  site.updated=lastUpdated;
}
