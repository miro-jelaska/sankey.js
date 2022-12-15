import SourceEntity from './entities/Source.js';
import DrainEntity from './entities/Drain.js';
import StationEntity from './entities/Station.js';
import BufferEntity from './entities/Buffer.js';

export default function (){
    const modelManager = new sankey.ModelManager();

    const source = new SourceEntity();
    const drain = new DrainEntity();

    const
        s1  = new StationEntity('1STAR-0A', sankey.EfficiencyLevel.High, '90%'),
        s2  = new StationEntity('2STAR-06', sankey.EfficiencyLevel.High, '90%'),
        s3  = new StationEntity('3FA01', sankey.EfficiencyLevel.High, '90%'),
        s4  = new StationEntity('4FB02', sankey.EfficiencyLevel.High, '90%'),
        s5  = new StationEntity('5FC03', sankey.EfficiencyLevel.Low, '0%'),
        s6  = new StationEntity('6FC04', sankey.EfficiencyLevel.High, '90%'),
        s7  = new StationEntity('7FD01', sankey.EfficiencyLevel.High, '90%'),
        s8  = new StationEntity('8KAR9605', sankey.EfficiencyLevel.Medium),
        s9  = new StationEntity('9MAN8695', sankey.EfficiencyLevel.High),
        s10 = new StationEntity('10FRS', sankey.EfficiencyLevel.Low, '20%'),
        s11 = new StationEntity('11QP-98', sankey.EfficiencyLevel.Medium, '70%'),
        s12 = new StationEntity('12QA', sankey.EfficiencyLevel.High),
        s13 = new StationEntity('13FIN', sankey.EfficiencyLevel.High, '90%');

    const
        buffer1 = new BufferEntity('3/12', sankey.EfficiencyLevel.High),
        buffer2 = new BufferEntity('80%', sankey.EfficiencyLevel.Medium),
        buffer3 = new BufferEntity('50%', sankey.EfficiencyLevel.High);

    modelManager.AddVertex(source, true);
    [drain, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, buffer1, buffer2, buffer3]
    .forEach(vertex => modelManager.AddVertex(vertex));

    const edges = [
        [source, s1, 1.0],
        [s1, s2, 1.0],
        [s2, buffer1, 1.0],

            [buffer1, s3, 0.5],
            [s3, s4, 0.48],
                [s4, s5, 0.20],
                [s4, s6, 0.40],

                [s5, s7, 0.0],
                [s6, s7, 0.4],

            [buffer1, s8, 0.5],
            [s8, s9, 0.45],
            [s9, buffer2, 0.40],
            [buffer2, s10, 0.38],
            [s10, s11, 0.20],

        [s7, buffer3, 0.35],
        [s11, buffer3, 0.20],
        [buffer3, s12, 0.30],
        [s12, s13, 0.30],
        [s13, drain, 0.30],
    ];

    modelManager.AddEdges(edges);

    return modelManager;
}