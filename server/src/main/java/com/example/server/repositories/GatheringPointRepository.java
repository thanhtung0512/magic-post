package com.example.server.repositories;

import com.example.server.domain.GatheringPoint;
import com.example.server.domain.TransactionPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface GatheringPointRepository extends JpaRepository<GatheringPoint, Long> {
    List<GatheringPoint> findAll();
    Optional<GatheringPoint> findById(Long id);

    @Query("SELECT g FROM GatheringPoint g WHERE g.gatheringPointId NOT IN :ids")
    List<GatheringPoint> findAllByIdNotIn(List<Long> ids);
}
